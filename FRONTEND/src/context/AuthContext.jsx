// src/context/AuthContext.jsx
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { authService } from "../api/auth";
import { getToken, setToken, removeToken } from "../utils/tokenUtils";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,
};

const AUTH_ACTIONS = {
  START: "START",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
  LOGOUT: "LOGOUT",
  SET_LOADING: "SET_LOADING",
  CLEAR_ERROR: "CLEAR_ERROR",
};

const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.START:
      return { ...state, loading: true, error: null };
    case AUTH_ACTIONS.SUCCESS:
      return { ...state, user: action.payload.user, isAuthenticated: true, loading: false, error: null };
    case AUTH_ACTIONS.FAILURE:
      return { ...state, user: null, isAuthenticated: false, loading: false, error: action.payload.error || "Auth error" };
    case AUTH_ACTIONS.LOGOUT:
      return { ...state, user: null, isAuthenticated: false, loading: false, error: null };
    case AUTH_ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    case AUTH_ACTIONS.CLEAR_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // On app start: if token exists, fetch current user
  useEffect(() => {
    const bootstrap = async () => {
      const token = getToken();
      if (!token) {
        dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
        return;
      }
      try {
        const user = await authService.getCurrentUser();
        dispatch({ type: AUTH_ACTIONS.SUCCESS, payload: { user } });
      } catch (error) {
        removeToken();
        dispatch({ type: AUTH_ACTIONS.LOGOUT });
      }
    };
    bootstrap();
  }, []);

  const login = async (credentials) => {
    dispatch({ type: AUTH_ACTIONS.START });
    try {
      const { user, token } = await authService.login(credentials);
      setToken(token);
      dispatch({ type: AUTH_ACTIONS.SUCCESS, payload: { user } });
      return { user, token };
    } catch (error) {
      dispatch({ type: AUTH_ACTIONS.FAILURE, payload: { error: error?.response?.data?.message || error.message } });
      throw error;
    }
  };

  const signup = async (userData) => {
    dispatch({ type: AUTH_ACTIONS.START });
    try {
      const { user, token } = await authService.signup(userData);
      setToken(token);
      dispatch({ type: AUTH_ACTIONS.SUCCESS, payload: { user } });
      return { user, token };
    } catch (error) {
      dispatch({ type: AUTH_ACTIONS.FAILURE, payload: { error: error?.response?.data?.message || error.message } });
      throw error;
    }
  };

  const logout = async () => {
    try { await authService.logout(); }
    finally {
      removeToken();
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
    }
  };

  const clearError = () => dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        signup,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
  return ctx;
};

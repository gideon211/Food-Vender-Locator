// src/context/AuthContext.jsx
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { authService } from "../api/auth";

const initialState = {
  user: null,
  token: null,
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
  SET_USER: "SET_USER",
};

const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.START:
      return { ...state, loading: true, error: null };

    case AUTH_ACTIONS.SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        error: null,
      };

    case AUTH_ACTIONS.FAILURE:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload.error || "Auth error",
      };

    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      };

    case AUTH_ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };

    case AUTH_ACTIONS.CLEAR_ERROR:
      return { ...state, error: null };

    case AUTH_ACTIONS.SET_USER:
      return { ...state, user: action.payload, isAuthenticated: true };

    default:
      return state;
  }
};

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const storedUserRaw = sessionStorage.getItem("user");
    const storedToken = sessionStorage.getItem("token");

    let storedUser = null;
    try {
      storedUser = storedUserRaw ? JSON.parse(storedUserRaw) : null;
    } catch {
      storedUser = null;
    }

    if (storedUser && storedToken) {
      dispatch({
        type: AUTH_ACTIONS.SUCCESS,
        payload: { user: storedUser, token: storedToken },
      });
    } else {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
    }
  }, []);

  const login = async (credentials) => {
    dispatch({ type: AUTH_ACTIONS.START });
    try {
      const response = await authService.login(credentials);
      const token = response.token;
      const user = response.user || { email: credentials.email };

      sessionStorage.setItem("user", JSON.stringify(user));
      sessionStorage.setItem("token", token);

      dispatch({ type: AUTH_ACTIONS.SUCCESS, payload: { user, token } });
      return { user, token };
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.FAILURE,
        payload: { error: error?.response?.data?.message || error.message },
      });
      throw error;
    }
  };

  const signup = async (userData) => {
    dispatch({ type: AUTH_ACTIONS.START });
    try {
      const response = await authService.signup(userData);
      const token = response.token;
      const user = response.user || { email: userData.email, name: userData.name };

      sessionStorage.setItem("user", JSON.stringify(user));
      sessionStorage.setItem("token", token);

      dispatch({ type: AUTH_ACTIONS.SUCCESS, payload: { user, token } });
      return { user, token };
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.FAILURE,
        payload: { error: error?.response?.data?.message || error.message },
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
    }
  };

  const setUser = (user) => {
    sessionStorage.setItem("user", JSON.stringify(user));
    dispatch({ type: AUTH_ACTIONS.SET_USER, payload: user });
  };

  const clearError = () => dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        signup,
        logout,
        setUser,
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

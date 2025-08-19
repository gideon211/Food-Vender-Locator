const logout = async () => {
  try {
    await authService.logout();
  } finally {
    localStorage.removeItem("user"); // clear persisted
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
  }
};

// src/utils/tokenUtils.js
const TOKEN_KEY = "authToken";

export const getToken = () => {
  try { return localStorage.getItem(TOKEN_KEY); }
  catch { return null; }
};

export const setToken = (token) => {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    return true;
  } catch { return false; }
};

export const removeToken = () => {
  try { localStorage.removeItem(TOKEN_KEY); return true; }
  catch { return false; }
};

// Optional helpers if your token is a JWT:
export const getTokenPayload = (token = null) => {
  const t = token || getToken();
  if (!t || !t.includes(".")) return null;
  try { return JSON.parse(atob(t.split(".")[1])); }
  catch { return null; }
};

export const isTokenExpired = (token = null) => {
  const payload = getTokenPayload(token);
  if (!payload?.exp) return false;
  return payload.exp < Date.now() / 1000;
};

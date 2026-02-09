
import { useState } from "react";
import { authAPI }  from "../utils/api";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);
  const [success, setSuccess] = useState(null);

  // ── REGISTER ────────────────────────────────────────
  const register = async (payload) => {
    setLoading(true); setError(null); setSuccess(null);
    try {
      const res = await authAPI.register(payload);
      // Store token + user (with role) in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user",  JSON.stringify(res.data.user));
      setSuccess("Account created successfully!");
      return { success: true, user: res.data.user };
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed";
      setError(msg);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  // ── LOGIN ────────────────────────────────────────────
  const login = async (payload) => {
    setLoading(true); setError(null); setSuccess(null);
    try {
      const res = await authAPI.login(payload);
      // Store token + user (with role) in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user",  JSON.stringify(res.data.user));
      setSuccess("Login successful!");
      return { success: true, user: res.data.user };
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";
      setError(msg);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  // ── LOGOUT ───────────────────────────────────────────
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return { register, login, logout, loading, error, success };
}
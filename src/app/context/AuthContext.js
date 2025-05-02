"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useToast } from "./ToastProvider";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const toast = useToast();

  useEffect(() => {
    const getToken = window.localStorage.getItem("token");

    setToken(getToken);
  }, []);

  // Decode JWT to get user info
  useEffect(() => {
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      // console.log('Payload:', payload);
      // Check if the token is expired
      const now = Math.floor(Date.now() / 1000);
      // console.log('now', now);
      // console.log('payload.exp', payload.exp);
      if (payload.exp < now) {
        // Token is expired
        toast.error("Session expired. Please log in again.");
        // alert('Session expired. Please log in again.');
        setToken(null);
        localStorage.removeItem("token");
        setUser(null);
        return;
      } else {
        // Token is valid, set user state
        // console.log('Token is valid, setting user state');

        setUser({
          name: payload.name,
          email: payload.email,
          role: payload.role,
          user_id: payload.user_id,
        });
      }
    } else {
      setUser(null);
    }
  }, [token]);

  console.log(user);

  const login = async (email, password) => {
    const res = await fetch("http://localhost/acmarket/api/auth/login.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      setToken(data.token);
      toast.success("Login Successfully");
      return true;
    } else {
      toast.success(data.message || "Login failed");
      // alert(data.message || 'Login failed');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    toast.success("Logout Successfully");
  };

  const authFetch = async (url, options = {}) => {
    const headers = {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    };

    return fetch(url, { ...options, headers });
  };

  const loginWithGoogle = async (googleToken) => {
    try {
      const res = await fetch(
        "http://localhost/acmarket/api/auth/google-login.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: googleToken }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        toast.success("Google Login Successful");
      } else {
        toast.error(data.message || "Google login failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, authFetch, loginWithGoogle }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

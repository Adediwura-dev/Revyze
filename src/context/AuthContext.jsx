import { createContext, useContext, useEffect, useState } from "react";
import { apiClient } from "../api/client";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("revyze_token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      const storedToken = localStorage.getItem("revyze_token");
      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await apiClient.get("/auth/me");
        if (response?.data) {
          setUser(response.data);
        } else {
          logout();
        }
      } catch {
        // Token expired or invalid
        logout();
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  const login = async (email, password) => {
    const response = await apiClient.post("/auth/login", { email, password });
    const { token: receivedToken, user: receivedUser } = response.data;

    localStorage.setItem("revyze_token", receivedToken);
    setToken(receivedToken);
    setUser(receivedUser);

    return receivedUser;
  };

  const register = async (fullName, email, password) => {
    const response = await apiClient.post("/auth/register", {
      fullName,
      email,
      password,
    });
    const { token: receivedToken, user: receivedUser } = response.data;

    localStorage.setItem("revyze_token", receivedToken);
    setToken(receivedToken);
    setUser(receivedUser);

    return receivedUser;
  };

  const logout = () => {
    localStorage.removeItem("revyze_token");
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: Boolean(user && token),
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};


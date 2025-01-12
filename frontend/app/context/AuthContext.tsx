// src/context/AuthContext.tsx
"use client";
import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

interface AuthContextType {
  user: unknown; // Replace `any` with a type for your user
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState(null); // Replace with actual user type
  const [token, setToken] = useState<string | null>(null);

  // Load user session from localStorage on initial load
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("user");
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post("/auth/login", {
        email,
        password,
      });
      const { user, token } = response.data;

      setUser(user);
      setToken(token);
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.error("Login failed:", error);
      throw error; // You can show an error message here as well
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the Auth context
export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

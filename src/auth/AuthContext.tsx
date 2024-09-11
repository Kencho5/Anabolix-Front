import React, { createContext, useState, useContext, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  loggedIn: boolean;
  verify: () => Promise<boolean>;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const token = localStorage.getItem("token") || "";
  const [loggedIn, setLoggedIn] = useState<boolean>(!!token);

  const verify = async () => {
    if (!token) return false;
    const decoded: any = jwtDecode(token);
    const now = Date.now() / 1000;
    return parseInt(decoded.exp, 10) > now;
  };

  const login = async (token: string) => {
    localStorage.setItem("token", token);
    setLoggedIn(true);
  };

  const logout = async () => {
    setLoggedIn(false);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ loggedIn, verify, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

import { createContext } from "preact";
import { useState, useContext } from "preact/hooks";
import Cookies from "js-cookie";
import { jwtVerify, JWTPayload } from "jose";

interface AuthContextType {
  loggedIn: boolean;
  verify: () => Promise<JWTPayload | undefined>;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
}

const secretKey = import.meta.env.VITE_SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({
  children,
}: {
  children: preact.ComponentChildren;
}) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(!!Cookies.get("jwt"));

  const verify = async () => {
    const token = Cookies.get("jwt") || "";
    try {
      const { payload } = await jwtVerify(token, encodedKey);
      setLoggedIn(true);
      return payload;
    } catch {
      setLoggedIn(false);
    }
  };

  const login = async (token: string) => {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    Cookies.set("jwt", token, {
      expires: expiresAt,
      secure: window.location.protocol === "https:",
      sameSite: "lax",
      path: "/",
    });
    setLoggedIn(true);
  };

  const logout = async () => {
    setLoggedIn(false);
    Cookies.remove("jwt");
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

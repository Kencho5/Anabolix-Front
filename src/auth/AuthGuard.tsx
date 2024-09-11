import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { loggedIn } = useAuth();

  return loggedIn ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;

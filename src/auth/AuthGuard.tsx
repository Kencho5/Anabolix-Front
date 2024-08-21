import { useEffect } from "preact/hooks";
import { route } from "preact-router";
import { useAuth } from "../auth/AuthContext";

interface ProtectedRouteProps {
  children: preact.ComponentChildren;
}

const AuthGuard = ({ children }: ProtectedRouteProps) => {
  const { loggedIn, verify } = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      await verify();
      if (!loggedIn) {
        route("/login", true);
      }
    };
    checkAuth();
  }, [loggedIn, verify]);

  return loggedIn ? <>{children}</> : null;
};

export default AuthGuard;

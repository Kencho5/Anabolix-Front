import { Router, Route } from "preact-router";
import Home from "../pages/Home";
import Login from "../pages/Login";
import AuthGuard from "../auth/AuthGuard";

const AppRoutes = () => {
  return (
    <Router>
      <Route
        path="/"
        component={() => (
          <AuthGuard>
            <Home />
          </AuthGuard>
        )}
      />
      <Route path="/login" component={Login} />
    </Router>
  );
};

export default AppRoutes;

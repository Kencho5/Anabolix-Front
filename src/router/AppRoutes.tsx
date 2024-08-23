import { Router, Route } from "preact-router";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

import NotFound from "../components/NotFound";
// import AuthGuard from "../auth/AuthGuard";

const AppRoutes = () => {
  return (
    <Router>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />

      <Route default component={NotFound} />
    </Router>
  );
};

export default AppRoutes;

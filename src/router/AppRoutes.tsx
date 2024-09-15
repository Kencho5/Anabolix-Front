import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import TopBarProgress from "react-topbar-progress-indicator";

import Home from "../pages/Home";
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const NotFound = lazy(() => import("../pages/NotFound"));

// import ProtectedRoute from "../auth/AuthGuard";

const AppRoutes = () => {
  return (
    <Suspense fallback={<TopBarProgress />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;

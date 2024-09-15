import { Suspense, lazy, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import TopBarProgress from "react-topbar-progress-indicator";

import Home from "../pages/Home";

// Lazy load components
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const NotFound = lazy(() => import("../pages/NotFound"));

const AppRoutes = () => {
  useEffect(() => {
    // Preload components
    import("../pages/Login");
    import("../pages/Register");
    import("../pages/NotFound");
  }, []);

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

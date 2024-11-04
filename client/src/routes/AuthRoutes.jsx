import { Routes, Route, Navigate } from "react-router-dom";
import LoginLayout from "../components/auth/login/LoginLayout";
import RegisterLayout from "../components/auth/register/RegisterLayout";
import GeneralRegister from "../pages/auth/register/Register";
import StudentLogin from "../pages/auth/login/StudentLogin";
import SupervisorLogin from "../pages/auth/login/SupervisorLogin";
import Login from "../pages/auth/login/Login";

const AuthRoutes = () => {
  return (
    <Routes>
      {/* Register Initial Page */}
      <Route element={<RegisterLayout />}>
        <Route path="/register" element={<GeneralRegister />} />
      </Route>

      {/* Login Routes */}
      <Route path="login" element={<LoginLayout />}>
        <Route index element={<Login />} />
      </Route>
    </Routes>
  );
};

export default AuthRoutes;

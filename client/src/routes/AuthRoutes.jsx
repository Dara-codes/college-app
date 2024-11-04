import { Routes, Route, Navigate } from "react-router-dom";
import LoginLayout from "../components/auth/login/LoginLayout";
import RegisterLayout from "../components/auth/register/RegisterLayout";
import GeneralRegister from "../pages/auth/register/Register";
import Login from "../pages/auth/login/Login";
import ForgotPasswordPage from "../pages/auth/forgot-password/ForgotPassword";
import CheckEmailPage from "../pages/auth/forgot-password/CheckEmail";
import ResetPasswordPage from "../pages/auth/forgot-password/ResetPassword";
import ResetSuccessPage from "../pages/auth/forgot-password/ResetSuccess";

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
      <Route path="forgot-password" element={<ForgotPasswordPage />} />
      <Route path="check-email" element={<CheckEmailPage />} />
      <Route path="reset-password" element={<ResetPasswordPage />} />
      <Route path="reset-success" element={<ResetSuccessPage />} />
    </Routes>
  );
};

export default AuthRoutes;

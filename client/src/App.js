import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Home from "./pages/Home";
import AuthRoutes from "./routes/AuthRoutes";
import OnboardingRoutes from "./routes/OnboardingRoutes";
import DashboardRoutes from "./routes/DashboardRoutes";
import StudentDashboardRoutes from "./routes/StudentDashboardRoutes";
import SupervisorDashboardRoutes from "./routes/SupervisorDashboardRoutes";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import { AuthProvider } from "./context/AuthContext";
import SelectUserType from "./pages/onboarding/SelectUserType";
import RegisterLayout from "./components/auth/register/RegisterLayout";
import Register from "./pages/auth/register/Register";
import ProtectedRoutes from "./routes/ProtectedRoutes";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/auth/*" element={<AuthRoutes />} />

          {/* Auth Routes */}
          <Route path="/auth" element={<RegisterLayout currentStep={1} />}>
            <Route path="register" element={<Register />} />
          </Route>

          {/* Onboarding Routes */}
          <Route
            path="/onboarding"
            element={<RegisterLayout currentStep={2} />}
          >
            <Route path="select-type" element={<SelectUserType />} />
          </Route>
          <Route path="/*" element={<ProtectedRoutes />} />
          {/* Catch-all Unauthorized Route */}
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="/onboarding/*" element={<OnboardingRoutes />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;

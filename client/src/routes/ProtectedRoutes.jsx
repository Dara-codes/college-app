import { Navigate, Route, Routes } from "react-router-dom";
import SupervisorDashboard from "../pages/supervisor/SupervisorDashboardLayout";
import useAuth from "../context/AuthContext"; // You'll need to implement this
import StudentDashboardLayout from "../pages/student/StudentDashboardLayout";
import SupervisorDashboardLayout from "../pages/supervisor/SupervisorDashboardLayout";

const ProtectedRoutes = () => {
  const { isAuthenticated, userType } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <Routes>
      {/* Student Routes */}
      <Route path="/student/*">
        <Route
          index
          element={
            userType === "student" ? (
              <StudentDashboardLayout />
            ) : (
              <Navigate to="/unauthorized" replace />
            )
          }
        />
      </Route>

      {/* Supervisor Routes */}
      <Route path="/supervisor/*">
        <Route
          index
          element={
            userType === "supervisor" ? (
              <SupervisorDashboardLayout />
            ) : (
              <Navigate to="/unauthorized" replace />
            )
          }
        />
      </Route>
    </Routes>
  );
};

export default ProtectedRoutes;

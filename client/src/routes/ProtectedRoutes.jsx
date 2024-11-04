import { Navigate, Route, Routes } from "react-router-dom";
import StudentDashboard from "../pages/student/Dashboard";
import SupervisorDashboard from "../pages/supervisor/Dashboard";
import useAuth from "../context/AuthContext"; // You'll need to implement this

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
              <StudentDashboard />
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
              <SupervisorDashboard />
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

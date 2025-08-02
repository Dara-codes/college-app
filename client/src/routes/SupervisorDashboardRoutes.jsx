import { Routes, Route } from "react-router-dom";
import SupervisorDashboardLayout from "../pages/supervisor/SupervisorDashboardLayout";
import SupervisorOverview from "../pages/supervisor/SupervisorOverview";
import SupervisorStudents from "../pages/supervisor/SupervisorStudents";
import SupervisorReviews from "../pages/supervisor/SupervisorReviews";
import SupervisorTraining from "../pages/supervisor/SupervisorTraining";
import SupervisorReports from "../pages/supervisor/SupervisorReports";

const SupervisorDashboardRoutes = () => (
  <Routes>
    <Route path="/" element={<SupervisorDashboardLayout />}>
      <Route index element={<SupervisorOverview />} />
      <Route path="students" element={<SupervisorStudents />} />
      <Route path="reviews" element={<SupervisorReviews />} />
      <Route path="training" element={<SupervisorTraining />} />
      <Route path="reports" element={<SupervisorReports />} />
    </Route>
  </Routes>
);

export default SupervisorDashboardRoutes;

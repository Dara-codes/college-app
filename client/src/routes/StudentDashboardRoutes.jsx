import { Routes, Route } from "react-router-dom";
import StudentDashboardLayout from "../pages/student/StudentDashboardLayout";
import StudentOverview from "../pages/student/StudentOverview";
import StudentMilestones from "../pages/student/StudentMilestones";
import StudentResearchLog from "../pages/student/StudentResearchLog";
import StudentTraining from "../pages/student/StudentTraining";
import StudentFeedback from "../pages/student/StudentFeedback";

const StudentDashboardRoutes = () => (
  <Routes>
    <Route path="/" element={<StudentDashboardLayout />}>
      <Route index element={<StudentOverview />} />
      <Route path="milestones" element={<StudentMilestones />} />
      <Route path="research-log" element={<StudentResearchLog />} />
      <Route path="training" element={<StudentTraining />} />
      <Route path="feedback" element={<StudentFeedback />} />
    </Route>
  </Routes>
);

export default StudentDashboardRoutes;

import { Routes, Route } from "react-router-dom";
import SelectUserType from "../pages/onboarding/SelectUserType";
import StudentSignIn from "../pages/onboarding/student/StudentSignIn";
import ProfileCustomization from "../pages/onboarding/student/ProfileCustomization";
import SetMilestone from "../pages/onboarding/student/SetMilestone";
import ResearchInterest from "../pages/onboarding/student/ResearchInterest";
import SupervisorSignIn from "../pages/onboarding/supervisor/SupervisorSignIn";
import SupervisorSignInSecond from "../pages/onboarding/supervisor/SupervisorSignInSecond";
const OnboardingRoutes = () => {
  return (
    <Routes>
      <Route path="select-type" element={<SelectUserType />} />
      <Route path="student">
        <Route path="signup" element={<StudentSignIn />} />
        <Route path="profile" element={<ProfileCustomization />} />
        <Route path="milestone" element={<SetMilestone />} />
        <Route path="research" element={<ResearchInterest />} />
      </Route>
      <Route path="supervisor">
        <Route path="signup" element={<SupervisorSignIn />} />
        <Route path="additional" element={<SupervisorSignInSecond />} />
      </Route>
    </Routes>
  );
};

export default OnboardingRoutes;

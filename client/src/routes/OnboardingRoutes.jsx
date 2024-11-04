import { Routes, Route } from "react-router-dom";
import OnboardingLayout from "../components/onboarding/OnboardingLayout";
import SelectUserType from "../pages/onboarding/SelectUserType";
import StudentSignIn from "../pages/onboarding/student/StudentSignIn";
import ProfileCustomization from "../pages/onboarding/student/ProfileCustomization";
import SetMilestone from "../pages/onboarding/student/SetMilestone";
import ResearchInterest from "../pages/onboarding/student/ResearchInterest";

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
    </Routes>
  );
};

export default OnboardingRoutes;

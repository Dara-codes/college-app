import { Routes, Route } from "react-router-dom";
import OnboardingLayout from "../components/onboarding/OnboardingLayout";
import SelectUserType from "../pages/onboarding/SelectUserType";
import StudentSignIn from "../pages/onboarding/student/StudentSignIn";
import ProfileCustomization from "../pages/onboarding/student/ProfileCustomization";

const OnboardingRoutes = () => {
  return (
    <Routes>
      <Route element={<OnboardingLayout />}>
        <Route path="select-type" element={<SelectUserType />} />
        <Route path="student/signup" element={<StudentSignIn />} />
        <Route path="student/profile" element={<ProfileCustomization />} />
      </Route>
    </Routes>
  );
};

export default OnboardingRoutes;

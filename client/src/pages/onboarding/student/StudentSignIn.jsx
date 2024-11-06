import OnboardingLayout from "../../../components/onboarding/OnboardingLayout";
import StudentSignInComponent from "../../../components/onboarding/student/StudentSignIn";
// import OnboardingLayout from "../../../components/onboarding/OnboardingLayout";

const StudentSignIn = () => {
  return (
    <OnboardingLayout
      currentStep={1}
      Thesistrack="Transform your thesis into a polished, publication-ready Masterpiece"
      to="/onboarding/select-type"
    >
      <StudentSignInComponent />
    </OnboardingLayout>
  );
};

export default StudentSignIn;

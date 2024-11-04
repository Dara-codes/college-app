import OnboardingLayout from "../../../components/onboarding/OnboardingLayout";
import StudentSignInComponent from "../../../components/onboarding/student/StudentSignIn";
// import OnboardingLayout from "../../../components/onboarding/OnboardingLayout";

const StudentSignIn = () => {
  return (
    <OnboardingLayout currentStep={1}>
      <StudentSignInComponent />
    </OnboardingLayout>
  );
};

export default StudentSignIn;

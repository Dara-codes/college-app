import ResearchInterestForm from "../../../components/onboarding/student/ResearchInterest";
import OnboardingLayout from "../../../components/onboarding/OnboardingLayout";

const ResearchInterestPage = () => {
  return (
    <OnboardingLayout currentStep={4}>
      <ResearchInterestForm />
    </OnboardingLayout>
  );
};

export default ResearchInterestPage;

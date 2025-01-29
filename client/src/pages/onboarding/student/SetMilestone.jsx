import { useNavigate } from "react-router-dom";
import SetMilestoneForm from "../../../components/onboarding/student/SetMilestone";
import OnboardingLayout from "../../../components/onboarding/OnboardingLayout";

const SetMilestonePage = () => {
  const navigate = useNavigate();

  const handleSkip = () => {
    navigate("/onboarding/student/research");
  };

  return (
    <OnboardingLayout
      currentStep={3}
      to="/onboarding/student/profile"
      onSkip={handleSkip}
      pageTitle="Milestone"
      Thesistrack=""
      pageSubtitle="Finish your Thesis faster with our help"
    >
      <SetMilestoneForm />
    </OnboardingLayout>
  );
};

export default SetMilestonePage;

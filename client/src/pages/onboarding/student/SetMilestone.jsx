import { useNavigate } from "react-router-dom";
import SetMilestoneForm from "../../../components/onboarding/student/SetMilestone";
import OnboardingLayout from "../../../components/onboarding/OnboardingLayout";

const SetMilestonePage = () => {
  const navigate = useNavigate();

  const handleSkip = () => {
    navigate("/onboarding/student/research");
  };

  return (
    <OnboardingLayout currentStep={3} onSkip={handleSkip}>
      <SetMilestoneForm />
    </OnboardingLayout>
  );
};

export default SetMilestonePage;

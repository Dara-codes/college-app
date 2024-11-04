import { useNavigate } from "react-router-dom";
import ProfileCustomizationForm from "../../../components/onboarding/student/ProfileCustomization";
import OnboardingLayout from "../../../components/onboarding/OnboardingLayout";

const ProfileCustomizationPage = () => {
  const navigate = useNavigate();

  const handleSkip = () => {
    navigate("/onboarding/student/milestone");
  };

  return (
    <OnboardingLayout currentStep={2} onSkip={handleSkip}>
      <ProfileCustomizationForm />
    </OnboardingLayout>
  );
};

export default ProfileCustomizationPage;

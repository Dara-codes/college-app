import { useNavigate } from "react-router-dom";
import ProfileCustomizationForm from "../../../components/onboarding/student/ProfileCustomization";
import OnboardingLayout from "../../../components/onboarding/OnboardingLayout";

const ProfileCustomizationPage = () => {
  const navigate = useNavigate();

  const handleSkip = () => {
    navigate("/onboarding/student/milestone");
  };

  return (
    <OnboardingLayout
      currentStep={2}
      to="/onboarding/student/signup"
      onSkip={handleSkip}
      Thesistrack="Thank you for joining and 
welcome to ThesisTrack"
      pageTitle="Personalize your Profile"
    >
      <ProfileCustomizationForm />
    </OnboardingLayout>
  );
};

export default ProfileCustomizationPage;

import SupervisorSignInSecondForm from "../../../components/onboarding/supervisor/SupervisorSignInSecond";
import SupervisorLayout from "../../../components/onboarding/supervisor/SupervisorLayout";

const SupervisorSignInSecondPage = () => {
  return (
    <SupervisorLayout currentStep={2}>
      <SupervisorSignInSecondForm />
    </SupervisorLayout>
  );
};

export default SupervisorSignInSecondPage;

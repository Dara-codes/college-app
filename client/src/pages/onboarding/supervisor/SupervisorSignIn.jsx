import SupervisorLayout from "../../../components/onboarding/supervisor/SupervisorLayout";
import SupervisorSigninForm from "../../../components/onboarding/supervisor/SupervisorSignIn";

const SupervisorSignIn = () => {
  return (
    <SupervisorLayout currentStep={1}>
      <SupervisorSigninForm />
    </SupervisorLayout>
  );
};

export default SupervisorSignIn;

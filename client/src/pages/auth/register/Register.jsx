import { useNavigate } from "react-router-dom";
import GeneralRegister from "../../../components/auth/register/GeneralRegister";

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = (data) => {
    // Save form data to state management if needed
    console.log("Form data:", data);
    // Navigate to user type selection
    navigate("/onboarding/select-type");
  };

  return <GeneralRegister onSubmit={handleSubmit} />;
};

export default Register;

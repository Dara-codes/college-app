import { useLocation } from "react-router-dom";
import CheckEmailComponent from "../../../components/auth/forgot-password/CheckEmail";

const DEFAULT_USER_EMAIL = "deejayblinks@gmail.com"

const CheckEmailPage = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email') || DEFAULT_USER_EMAIL;

  return <CheckEmailComponent userEmail={email} />;
};

export default CheckEmailPage;

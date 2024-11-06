import { Outlet } from "react-router-dom";
import graduateImg from "../../../assets/images/auth/student-group.png";
import supervisorImg from "../../../assets/images/auth/supervisor-group.png";
// import logoImg from "../../../assets/images/cta/students.jpg";

const LoginLayout = ({ userType = "student" }) => {
  const backgroundImage = userType === "student" ? graduateImg : supervisorImg;

  return (
    <div className="min-h-screen">
      {/* Desktop Layout */}
      <div className="hidden md:flex min-h-screen">
        {/* Left Section - Form */}
        <div className="w-1/2 bg-white p-12 flex flex-col">
          {/* <img
            src={logoImg}
            alt="Logo"
            className="w-[100px] h-[40px] bg-[#D9D9D9] rounded"
          /> */}
          <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
            <Outlet />
          </div>
        </div>

        {/* Right Section - Image */}
        <div className="w-1/2 relative bg-[#0B4C77]">
          <img
            src={backgroundImage}
            alt="Students"
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-[#0B4C77] opacity-50" />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col min-h-screen">
        {/* Hero Image */}
        <div className="relative h-[200px]">
          <img
            src={backgroundImage}
            alt="Students"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0B4C77]/50" />
        </div>

        {/* Form Section */}
        <div className="flex-1 bg-white px-5 pt-8 pb-6 flex flex-col items-center">
          {/* <img
            src={logoImg}
            alt="Logo"
            className="w-[100px] h-[40px] bg-[#D9D9D9] rounded mb-6"
          /> */}
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginLayout;

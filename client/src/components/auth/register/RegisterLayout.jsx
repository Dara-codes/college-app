import { Outlet } from "react-router-dom";
import RegisterProgressBar from "./RegisterProgressBar";
import graduateImg from "../../../assets/images/auth/student-group.png";
// import logoImg from "../../../assets/images/auth/supervisor-group.png";

const RegisterLayout = ({ currentStep = 1 }) => {
  // Add currentStep prop with default value
  return (
    <div className="min-h-screen">
      {/* Desktop Layout */}
      <div className="hidden md:flex min-h-screen">
        {/* Left Section with Image */}
        <div className="w-1/2 relative bg-[#0B4C77]">
          <div className="absolute top-6 left-12 z-20">
            {/* <img
              src={logoImg}
              alt="Logo"
              className="w-[100px] h-[40px] object-contain"
            /> */}
          </div>

          <img
            src={graduateImg}
            alt="Graduates"
            className="absolute bg-[#0B4C778C] inset-0 w-full h-full object-cover mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-[#0B4C77] opacity-50" />
          <div className="absolute bottom-[10%] left-12 right-12">
            <h1 className="text-center font-inter text-4xl font-extrabold leading-tight text-white">
              Transform your thesis into a polished, publication-ready
              Masterpiece
            </h1>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-1/2 bg-white p-12">
          <div className="w-full mx-auto max-w-md">
            <h2 className="text-[#0B4C77] text-2xl font-semibold mb-6">
              Sign up
            </h2>
            <div className="mb-8 mx-auto">
              <RegisterProgressBar currentStep={currentStep} />
            </div>
            <Outlet />
          </div>
          </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden min-h-screen">
        {/* Hero Image */}
        <div className="relative h-[180px]">
          <img
            src={graduateImg}
            alt="Graduates"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0B4C77]/50" />
          <h1 className="absolute bottom-5 text-center left-5 right-5 text-2xl font-bold text-white">
            Transform your thesis into a polished, publication-ready Masterpiece
          </h1>
        </div>

        {/* Form Container */}
        <div className="bg-white flex-1 px-5">
          <div className="mt-8 mb-6">
            {/* <img
              src={logoImg}
              alt="Logo"
              className="w-[100px] h-[40px] object-contain"
            /> */}
          </div>

          {/* Title */}
          <h2 className="text-[#0B4C77] text-2xl font-semibold mb-4">
            Sign up
          </h2>

          {/* Progress Line - Updated to use currentStep */}
          <div className="mb-8">
            <RegisterProgressBar currentStep={currentStep} isMobile />
          </div>

          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default RegisterLayout;

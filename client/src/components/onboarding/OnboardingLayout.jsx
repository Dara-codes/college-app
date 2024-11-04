import { Outlet } from "react-router-dom";
import graduateImg from "../../assets/images/auth/student-group.png";
import logoImg from "../../assets/images/cta/students.jpg";

const OnboardingLayout = ({ children, currentStep = 1 }) => {
  return (
    <div className="min-h-screen">
      {/* Desktop Layout */}
      <div className="hidden md:flex min-h-screen">
        {/* Left Section with Image */}
        <div className="w-1/2 relative bg-[#0B4C77]">
          {/* Logo positioned at top-left of image section */}
          <div className="absolute top-6 left-12 z-20">
            <img
              src={logoImg}
              alt="Logo"
              className="w-[100px] h-[40px] bg-[#D9D9D9] rounded"
            />
          </div>

          <img
            src={graduateImg}
            alt="Graduates"
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-[#0B4C77] opacity-50" />
          <div className="absolute bottom-[25%] left-12 right-12">
            <h1 className="text-2xl font-bold text-white">
              Thank you for joining us and Welcome to (Project Design)
            </h1>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-1/2 bg-white p-12 flex flex-col">
          {/* Skip button at top-right */}
          <div className="self-end">
            <button className="text-[#0B4C77] hover:text-blue-700">Skip</button>
          </div>

          {/* Progress bar at top */}
          <div className="w-full h-1 bg-[#E5E7EB] rounded-full overflow-hidden mb-8">
            <div
              className="h-full bg-[#0B4C77] transition-all duration-300 rounded-full"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>

          {/* Main Content */}
          {children || <Outlet />}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col min-h-screen">
        {/* Hero Image */}
        <div className="relative h-[180px]">
          <img
            src={graduateImg}
            alt="Graduates"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0B4C77]/50" />
          <h1 className="absolute bottom-5 left-5 right-5 text-2xl font-bold text-white">
            Thank you for joining us and Welcome to (Project Design)
          </h1>
        </div>

        {/* Form Container */}
        <div className="flex-1 bg-white px-5">
          <div className="flex flex-col items-start gap-5">
            {/* Logo */}
            <div className="mt-5">
              <img
                src={logoImg}
                alt="Logo"
                className="w-[100px] h-[40px] bg-[#D9D9D9] rounded"
              />
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1 bg-[#E5E7EB] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#0B4C77] transition-all duration-300 rounded-full"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              />
            </div>

            {/* Main Content */}
            {children || <Outlet />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingLayout;

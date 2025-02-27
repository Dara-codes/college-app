import { Outlet, useNavigate } from "react-router-dom";
import graduateImg from "../../../assets/images/auth/supervisor-group.png";
// import logoImg from "../../../assets/images/testimonials/supervisor2.png";

const SupervisorLayout = ({ children, currentStep = 1, onSkip }) => {
  const navigate = useNavigate();

  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    }
    navigate("/auth/login");
  };

  // Calculate progress width for 2 steps
  const progressWidth = `${(currentStep / 2) * 100}%`;

  return (
    <div className="min-h-screen">
      {/* Desktop Layout */}
      <div className="hidden md:flex min-h-screen">
        {/* Left Section with Image */}
        <div className="w-1/2 relative bg-[#0B4C77]">
          {/* Logo positioned at top-left of image section */}
          <div className="absolute top-6 left-12 z-20">
            {/* <img
              src={logoImg}
              alt="Logo"
              className="w-[100px] h-[40px] bg-[#D9D9D9] rounded"
            /> */}
          </div>

          <img
            src={graduateImg}
            alt="Graduates"
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-[#0B4C77] opacity-50" />
          <div className="absolute bottom-[10%] left-12 right-12">
            <h1 className="text-4xl font-inter font-bold text-white">
              Guide the next generation of researchers—join us to mentor,
              review, and inspire academic excellence
            </h1>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-1/2 bg-white p-12 flex flex-col">
          {/* Skip button at top-right */}{" "}
          <div className="self-end">
            {/* <button
              onClick={handleSkip}
              className="text-[#0B4C77] hover:text-blue-700"
            >
              Skip
            </button>  */}
          </div>
          <div className="w-full max-w-md mx-auto">
            <h2 className="text-[#0B4C77] text-2xl font-semibold mb-6">
              Sign up
            </h2>
          </div>
          {/* Progress bar at top - 2 steps */}
          <div className="mx-auto w-ful w-[450px] h-2 bg-[#B4E1FE] rounded-full overflow-hidden mb-8">
            <div
              className="h-full bg-[#0B4C77] transition-all duration-300 rounded-full"
              style={{ width: progressWidth }}
            />
          </div>
          {/* Main Content */}
          <div className="flex-1">{children || <Outlet />}</div>
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
          <div className="absolute top-4 right-4">
            <button
              onClick={handleSkip}
              className="text-white hover:text-white/80"
            >
              Skip
            </button>
          </div>
          <h1 className="absolute bottom-5 left-5 right-5 text-xl font-bold text-white">
            Guide the next generation of researchers—join us to mentor, review,
            and inspire academic excellence
          </h1>
        </div>

        {/* Form Container */}
        <div className="flex-1 bg-white px-5">
          <div className="flex flex-col items-center gap-5">
            {/* Logo */}
            <div className="mt-5">
              {/* <img
                src={logoImg}
                alt="Logo"
                className="w-[100px] h-[40px] bg-[#D9D9D9] rounded"
              /> */}
            </div>
            <h2 className="text-[#0B4C77] text-2xl font-semibold mb-6">
              Sign up
            </h2>

            {/* Progress Bar - 2 steps */}
            <div className="w-full h-[6px] bg-[#B4E1FE] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#0B4C77] transition-all duration-300 rounded-full"
                style={{ width: progressWidth }}
              />
            </div>

            {/* Main Content */}
            <div className="w-full">{children || <Outlet />}</div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 767px) {
          .select-dropdown {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default SupervisorLayout;

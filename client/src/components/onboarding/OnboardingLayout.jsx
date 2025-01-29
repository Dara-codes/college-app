import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import graduateImg from "../../assets/images/auth/generalsignup.png";
import studentSignupImg from "../../assets/images/auth/generalsignup.png";
import studentProfileImg from "../../assets/images/auth/profc.png";
import studentMilestoneImg from "../../assets/images/auth/milestone.png";
import studentResearchImg from "../../assets/images/auth/research.png";
import supervisorImg from "../../assets/images/auth/supervisor-group.png";

const OnboardingLayout = ({
  children,
  to,
  Thesistrack,
  currentStep = 1,
  pageTitle = "Sign up",
  pageSubtitle = "",
  onSkip,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    }
    navigate("/onboarding/student/milestone");
  };

  const handleNavigate = () => {
    if (to) {
      navigate(to);
    }
  };

  // Function to determine which background image to use based on current path
  const getBackgroundImage = () => {
    const path = location.pathname;

    if (path.includes("/onboarding/student/signup")) {
      return studentSignupImg;
    } else if (path.includes("/onboarding/student/profile")) {
      return studentProfileImg;
    } else if (path.includes("/onboarding/student/milestone")) {
      return studentMilestoneImg;
    } else if (path.includes("/onboarding/student/research")) {
      return studentResearchImg;
    } else if (path.includes("/supervisor")) {
      return supervisorImg;
    }
    return graduateImg; // Default fallback image
  };

  // Get the appropriate background image
  const backgroundImage = getBackgroundImage();

  // Calculate progress percentage
  const progressWidth = `${(currentStep / 4) * 100}%`;

  return (
    <div className="min-h-screen">
      {/* Desktop Layout */}
      <div className="hidden md:flex min-h-screen">
        {/* Left Section with Image */}
        <div className="w-1/2 relative bg-[#0B4C77]">
          <div className="absolute top-6 left-12 z-20">{/* Logo*/}</div>

          <img
            src={backgroundImage}
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-[#0B4C77] opacity-50" />
          <div className="absolute bottom-[10%] left-12 right-12">
            <h1 className="text-center font-inter text-4xl font-extrabold leading-tight text-white">
              {Thesistrack}
            </h1>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-1/2 bg-white p-12 flex flex-col">
          <div className="self-end">{/* Skip button */}</div>

          <div className="w-full max-w-md mx-auto">
            <div onClick={handleNavigate} style={{ cursor: "pointer" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="flex w-[32px] h-[32px] p-[6px] mb-10 justify-center items-center gap-[10px] flex-shrink-0 rounded-[16px] border border-[#494949]"
              >
                <path
                  d="M19 11H7.82998L12.71 6.12C13.1 5.73 13.1 5.09 12.71 4.7C12.32 4.31 11.69 4.31 11.3 4.7L4.70998 11.29C4.31998 11.68 4.31998 12.31 4.70998 12.7L11.3 19.29C11.69 19.68 12.32 19.68 12.71 19.29C13.1 18.9 13.1 18.27 12.71 17.88L7.82998 13H19C19.55 13 20 12.55 20 12C20 11.45 19.55 11 19 11Z"
                  fill="#1C1B1B"
                />
              </svg>
            </div>
          </div>
          <div className="w-full max-w-md mx-auto">
            <h2 className="text-[#0B4C77] mb-[18px] text-[27px] leading-custom-line-height font-semibold">
              {pageTitle}
            </h2>
          </div>

          <div className="mx-auto w-[450px] h-2 bg-[#B4E1FE] rounded-full overflow-hidden mb-[18px]">
            <div
              className="h-full bg-[#0B4C77] transition-all duration-300 rounded-full"
              style={{ width: progressWidth }}
            />
          </div>
          <div className="w-full max-w-md mx-auto">
            {pageSubtitle && (
              <p className="font-inter mb-[24px] text-custom-size font-medium leading-custom-line-height mt-2">
                {pageSubtitle}
              </p>
            )}
          </div>

          <div className="flex-1">{children || <Outlet />}</div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col min-h-screen">
        {/* Hero Image */}
        <div className="relative h-[180px]">
          <img
            src={backgroundImage}
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-[#0B4C77]/50" />
          <button
            onClick={handleSkip}
            className="absolute top-4 right-4 text-white hover:text-white/80 text-sm z-10"
          >
            Skip
          </button>
          <h1 className="absolute bottom-5 left-5 right-5 text-2xl font-bold font-inter text-white">
            {Thesistrack}
          </h1>
        </div>

        {/* Form Container */}
        <div className="flex-1 bg-white px-5">
          <div className="flex flex-col items-center gap-5">
            {/* Logo */}
            <div className="mt-5">
              {/* Logo commented out as in original */}
            </div>
            <div className="w-full max-w-md mx-auto">
              <h2 className="text-[#0B4C77] text-[27px] leading-custom-line-height font-semibold mb-[18px]">
                {pageTitle}
              </h2>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-[6px] bg-[#B4E1FE] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#0B4C77] transition-all duration-300 mb-[18px] rounded-full"
                style={{ width: progressWidth }}
              />
            </div>
            <div className="w-full max-w-md mx-auto">
              {pageSubtitle && (
                <p className="font-inter mx-auto text-custom-size font-medium leading-custom-line-height mb-[20px]">
                  {pageSubtitle}
                </p>
              )}
            </div>

            {/* Main Content */}
            <div className="w-full">{children || <Outlet />}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingLayout;

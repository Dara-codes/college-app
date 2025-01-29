const RegisterProgressBar = ({ currentStep, isMobile }) => {
  // For mobile, return a simple blue line with 50% width on step 1
  if (isMobile) {
    return (
      <div className="w-full">
        <div className="h-[6px] bg-[#B4E1FE] rounded-full overflow-hidden">
        <div
          className={`h-[6px] rounded-md bg-[#0B4C77] transition-all duration-300`}
          style={{ width: currentStep === 2 ? "100%" : "50%" }}
        />
        </div>
      </div>
    );
  }

  //desktop
  return (
    <div className="w-ful w-[450px]">
      <div className="h-2 bg-[#B4E1FE] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#0B4C77] transition-all duration-300 rounded-full"
          style={{ width: currentStep === 2 ? "100%" : "50%" }}
        />
      </div>
    </div>
  );
};

export default RegisterProgressBar;

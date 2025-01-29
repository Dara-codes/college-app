const ProgressBar = ({ currentStep, totalSteps }) => {
  return (
    <div className="relative h-1 bg-[#E5E7EB] rounded-full overflow-hidden">
      <div
        className="absolute left-0 top-0 h-full bg-[#0B4C77] transition-all duration-300 rounded-full"
        style={{ width: `${(currentStep / totalSteps) * 100}%` }}
      />
    </div>
  );
};

export default ProgressBar;

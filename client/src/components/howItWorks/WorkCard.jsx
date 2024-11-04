import React from "react";

const WorkCard = ({ number, title, description }) => {
  return (
    <div
      className="w-full md:w-[180px] lg:w-[220px] h-[180px] md:h-[200px] lg:h-[220px] 
      flex-shrink-0 relative rounded-[12px] overflow-hidden
      bg-gradient-to-br from-[#3D80AC] from-31.83% to-[#296C98] to-76.17%
      hover:shadow-lg transition-shadow"
    >
      {/* Content Container */}
      <div className="flex flex-col h-full p-6">
        {/* Big Number */}
        <div className="mb-auto">
          <span
            className="text-[#F7AC1B] text-[32px] md:text-[40px] lg:text-[48px] 
            font-semibold font-poppins leading-[120%]
            drop-shadow-[0_8px_12px_#2F6E9E,0_4px_4px_#30709F]"
          >
            {number}
          </span>
        </div>

        {/* Text Content */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-2">{title}</h3>
          <p className="text-white/90 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default WorkCard;

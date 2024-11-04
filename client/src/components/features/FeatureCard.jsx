import React from "react";

const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="flex w-[320px] h-[250px] p-[24px] flex-col justify-center items-center gap-[10px] flex-shrink-0 bg-[#296C98]/80 rounded-lg md:flex-1">
      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
        <Icon className="w-6 h-6 text-[#296C98]" />
      </div>
      <h3 className="text-white text-xl font-semibold text-center">{title}</h3>
      <p className="text-white text-base text-center leading-[120%]">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;

import React from "react";

const TestimonialCard = ({ name, role, image, comment }) => {
  return (
    <div className="flex flex-col p-6 bg-white rounded-[20px] transition-all duration-300 hover:shadow-lg">
      <p className="text-gray-600 text-sm md:text-base mb-6 leading-relaxed min-h-[80px]">
        {comment}
      </p>
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-semibold text-gray-900">{name}</h4>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
        <img
          src={image}
          alt={name}
          className="w-12 h-12 rounded-full object-cover"
        />
      </div>
    </div>
  );
};

export default TestimonialCard;

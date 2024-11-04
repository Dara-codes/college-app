import React from "react";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import studentImage from "../assets/images/student.png";

const HeroSection = () => {
  return (
    <main className="w-full bg-[#296C98]">
      {/* Container for max-width and centering */}
      <div className="w-full mx-auto max-w-[375px] md:max-w-[1512px] px-5">
        {/* Content wrapper with centered alignment */}
        <div className="pt-[100px] md:pt-[50px] lg:pt-[5px] md:px-[25px] md:flex md:justify-between md:items-center">
          {/* Text Content */}
          <div className="w-full md:w-[907px]">
            <h1 className="text-white font-inter text-[32px] leading-[120%] font-bold md:text-[34px] lg:text-[60px] md:leading-tight">
              Streamline Your Thesis Journey with Seamless Collaboration
            </h1>
            <p className="text-white font-inter text-base leading-[120%] font-normal md:text-lg md:leading-relaxed max-w-[309px] md:max-w-none mt-4">
              Track milestones, log research activities, and collaborate with
              your supervisor effortlessly—all in one platform.
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center bg-[#F6AD37] text-white px-6 py-3 rounded-[20px] mt-8"
            >
              Get started for free
              <BsArrowRight className="ml-2" />
            </Link>
          </div>

          {/* Image Container */}
          <div className="mt-8 md:mt-0">
            <div className="relative w-full max-w-[375px] md:w-[540.711px] md:h-[643.621px] flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 541 644"
                className="w-full h-full"
              >
                <defs>
                  <clipPath id="blobClip">
                    <path d="M517.428 327.121C607.164 434.5 417.14 643.621 293.428 643.621C169.716 643.621 -54.072 514.5 11.928 327.121C63.131 140.205 114.334 -44.7338 290.352 9.65005C292.341 10.2646 294.585 10.6109 296.666 10.6534C416.321 13.0966 371.231 152.18 517.428 327.121Z" />
                  </clipPath>
                </defs>
                <path
                  d="M517.428 327.121C607.164 434.5 417.14 643.621 293.428 643.621C169.716 643.621 -54.072 514.5 11.928 327.121C63.131 140.205 114.334 -44.7338 290.352 9.65005C292.341 10.2646 294.585 10.6109 296.666 10.6534C416.321 13.0966 371.231 152.18 517.428 327.121Z"
                  fill="#FCD34D"
                />
                <image
                  href={studentImage}
                  width="100%"
                  height="100%"
                  clipPath="url(#blobClip)"
                  preserveAspectRatio="xMidYMid slice"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HeroSection;

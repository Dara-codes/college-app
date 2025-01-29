import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import { testimonials } from "../../constants/testimonialData";
import TestimonialCard from "./TestimonialCard";

import "swiper/css";
import "swiper/css/navigation";
import "./testimonials.css";

const Testimonials = () => {
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handleSlideChange = () => {
    if (swiperRef.current) {
      setIsBeginning(swiperRef.current.swiper.isBeginning);
      setIsEnd(swiperRef.current.swiper.isEnd);
    }
  };

  return (
    <section className="w-full bg-white py-12 md:py-16">
      <div className="max-w-[375px] md:max-w-[1200px] mx-auto px-5">
        {/* Header remains the same */}
        <div className="text-center mb md:mb">
          <h2 className="text-center text-[28px] md:text-[40px] font-semibold mb-2 font-inter text-[#1C1B1B] leading-[120%]">
            <span className="flex items-center justify-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#1C1B1B]"></span>
              Testimonials
            </span>
          </h2>
          <p className="text-gray-600">
            Hear What People Say About{" "}
            <span className="text-[#F7AC1B]">LOREM</span>
          </p>
        </div>

        {/* Testimonials Slider Container */}
        <div className="relative">
          <Swiper
            ref={swiperRef}
            modules={[Navigation]}
            spaceBetween={34}
            slidesPerView={1}
            onSlideChange={handleSlideChange}
            onSwiper={handleSlideChange}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="testimonials-swiper"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <TestimonialCard {...testimonial} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Controls Container */}
          <div className="absolute bottom-0 right-0 flex items-center gap-3 z-10">
            <button
              onClick={() => swiperRef.current.swiper.slidePrev()}
              disabled={isBeginning}
              className={`custom-prev w-10 h-10 flex items-center justify-center 
                transition-all duration-300 hover:scale-110
                ${
                  isBeginning
                    ? "opacity-50 cursor-not-allowed hover:scale-100"
                    : ""
                }`}
            >
              <BsArrowLeftCircleFill
                className={`w-8 h-8 ${
                  isBeginning ? "text-gray-400" : "text-[#296C98]"
                }`}
              />
            </button>
            <button
              onClick={() => swiperRef.current.swiper.slideNext()}
              disabled={isEnd}
              className={`custom-next w-10 h-10 flex items-center justify-center
                transition-all duration-300 hover:scale-110
                ${
                  isEnd ? "opacity-50 cursor-not-allowed hover:scale-100" : ""
                }`}
            >
              <BsArrowRightCircleFill
                className={`w-8 h-8 ${
                  isEnd ? "text-gray-400" : "text-[#296C98]"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

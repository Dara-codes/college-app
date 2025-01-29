// src/components/cta/CallToAction.jsx
import React from "react";
import { Link } from "react-router-dom";
import studentImage from "../../assets/images/cta/students.jpg";

const CallToAction = () => {

  return (
    <section className="w-full bg-[#296C98] overflow-hidden">
      <div className="max-w-[375px] md:max-w-[1200px] mx-auto">
        {/* Mobile View */}
        <div className="md:hidden flex flex-col px-5 py-8 gap-10">
          <div className="space-y-4">
            <h2 className="text-white text-3xl font-semibold">
              Ready to get Started?
            </h2>
            <p className="text-white/90">
              Join the platform that simplifies thesis management.
            </p>
            <Link
              to="/auth/register"
              className="inline-block bg-[#F6AD37] text-white px-6 py-3 rounded-lg
                hover:bg-[#E5932C] transition-colors"
            >
              Sign up now
            </Link>
          </div>
          <img
            src={studentImage}
            alt="Happy Students"
            className="w-full rounded-lg"
          />
        </div>

        {/* Desktop View */}
        <div className="hidden md:flex items-center justify-between p-16">
          <div className="max-w-[450px] space-y-6">
            <h2 className="text-white text-4xl font-semibold">
              Ready to get Started?
            </h2>
            <p className="text-white/90 text-lg">
              Join the platform that simplifies thesis management.
            </p>
            <Link
              to="/auth/register"
              className="inline-block bg-[#F6AD37] text-white px-8 py-3 rounded-lg
                hover:bg-[#E5932C] transition-colors"
            >
              Sign up now
            </Link>
          </div>
          <div className="w-[580px]">
            <img
              src={studentImage}
              alt="Happy Students"
              className="w-full rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;

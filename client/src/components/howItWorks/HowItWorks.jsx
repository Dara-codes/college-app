import React from "react";
import WorkCard from "./WorkCard";

const steps = [
  {
    number: "01",
    title: "Sign Up",
    description: "Create your free account and set up your profile.",
  },
  {
    number: "02",
    title: "Create Milestone",
    description:
      "Set and customize your research milestones to guide your progress.",
  },
  {
    number: "03",
    title: "Collaborate",
    description:
      "Share milestones, logs, and activities with your supervisor for instant feedback",
  },
  {
    number: "04",
    title: "Track Progress",
    description:
      "Monitor your research journey and see all updates in one place.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="w-full px-5 my-8">
      {/* Desktop View */}
      <div className="hidden md:block max-w-[800px] lg:max-w-[1200px] mx-auto">
        {/* <h2 className="text-center text-3xl font-semibold mb-10">
          . How it works
        </h2> */}
        <h2 className="text-center text-[40px] font-semibold mb-12 font-inter text-[#1C1B1B] leading-[120%]">
          <span className="flex items-center justify-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#1C1B1B]"></span>
            How it works
          </span>
        </h2>
        <div className="relative h-[300px] lg:h-[411px] mx-auto">
          {/* Diagonal Layout with reduced overlapping */}
          <div className="absolute left-0 top-0 transform hover:-translate-y-2 transition-transform">
            <WorkCard {...steps[0]} />
          </div>
          <div className="absolute left-[22%] md:left-[24%] top-[12%] transform hover:-translate-y-2 transition-transform">
            <WorkCard {...steps[1]} />
          </div>
          <div className="absolute left-[44%] md:left-[48%] top-[24%] transform hover:-translate-y-2 transition-transform">
            <WorkCard {...steps[2]} />
          </div>
          <div className="absolute left-[66%] md:left-[72%] top-[36%] transform hover:-translate-y-2 transition-transform">
            <WorkCard {...steps[3]} />
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden w-full max-w-[375px] mx-auto bg-[#FFFEFE] py-">
        {/* <h2 className="text-xl font-semibold mb-6 text-center">How it works</h2> */}
        <h2 className="text-center text-xl font-semibold mb-6 font-inter">
          <span className="flex items-center justify-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#1C1B1B]"></span>
            How it works
          </span>
        </h2>
        <div className="flex flex-col gap-4 px-4">
          {steps.map((step, index) => (
            <div key={index} className="w-full max-w-[335px] mx-auto">
              <WorkCard {...step} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

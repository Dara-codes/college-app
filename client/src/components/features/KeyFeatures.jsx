import React from "react";
import { Sprout, FileText, Wrench, GraduationCap } from "lucide-react";

const features = [
  {
    icon: Sprout,
    title: "Milestone Tracking",
    description:
      "Stay on top of your progress by tracking and achieving key milestones.",
  },
  {
    icon: FileText,
    title: "Research Log",
    description:
      "Document your research findings, activities, and observations in a structured log.",
  },
  {
    icon: Wrench,
    title: "Collaboration Tools",
    description:
      "Communicate and share feedback with your supervisor in real-time.",
  },
  {
    icon: GraduationCap,
    title: "Training Modules",
    description:
      "Access training modules that help you develop essential research and writing skills.",
  },
];

const KeyFeatures = () => {
  return (
    <section
      id="features"
      className="relative w-full md:w-[1512px] bg-[#093B5C]"
    >
      {/* Ellipse */}
      <div
        className="hidden md:block absolute left-1/2 -translate-x-1/2 -top-[50px]
        w-[700px] xl:w-[1000px]
        h-[400px] xl:h-[500px]
        rounded-[100%] bg-white/50"
      />

      {/* Content Container */}
      <div className="relative z-10 w-full">
        {/* mobile view */}
        <div className="md:hidden flex flex-col px-5 py-8">
          <div className="md:hidden flex flex-col px-5 py-8">
            <h2 className="text-white text-xl font-semibold mb-6 text-center">
              Our Features at a Glance
            </h2>
            <div className="flex flex-col gap-4 w-full  lg:w-full">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-[#296C98]/80 p-6 rounded-[20px] flex flex-col items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-[#093B5C]" />
                  </div>
                  <h3 className="text-white text-lg font-semibold text-center">
                    {feature.title}
                  </h3>
                  <p className="text-white/90 text-sm text-center leading-[120%]">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          //{" "}
        </div>

        {/* Desktop View*/}
        <div className="hidden md:flex flex-col items-center py-14">
          <h2 className="text-white text-2xl font-semibold mb-10">
            Our Features at a Glance
          </h2>
          <div
            className="max-w-[1000px] xl:max-w-[1200px] mx-aut px-4
            flex items-center justify-center gap-[16px] xl:gap-[34px]"
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex w-[200px] xl:w-[270px] h-[250px] p-6
                flex-col justify-center items-center gap-4 bg-[#296C98]/80
                rounded-[20px] flex-shrink-0 hover:bg-[#296C98]/90
                transition-colors duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-[#093B5C]" />
                </div>
                <h3 className="text-white text-lg lg:text-xl font-semibold text-center">
                  {feature.title}
                </h3>
                <p className="text-white/90 text-sm lg:text-base text-center leading-[120%]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default KeyFeatures;

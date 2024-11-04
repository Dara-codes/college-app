import React from "react";
import { Link } from "react-router-dom";

const footerLinks = [
  {
    title: null,
    links: ["About", "Features", "How it works", "Contact us"],
  },
  {
    title: null,
    links: ["Privacy policy", "Terms & Conditions"],
  },
];

const Footer = () => {
  return (
    <footer className="w-full bg-[#093B5C] text-white">
      {/* Mobile View */}
      <div className="md:hidden px-5 py-8 w-[375px] h-[533px] mx-auto">
        <div className="space-y-8">
          {/* Logo Area */}
          <div className="bg-gray-200 w-[200px] h-[60px] rounded"></div>

          {/* Description */}
          <p className="text-[15.75px] leading-[120%] font-inter text-white max-w-[320px]">
            Porem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            vulputate libero et velit interdum, ac aliquet odio mattis.
          </p>

          {/* Links Container */}
          <div className="flex gap-24">
            <div className="flex flex-col gap-6">
              {footerLinks[0].links.map((link, index) => (
                <Link
                  key={index}
                  to={`/${link.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  {link}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-6">
              {footerLinks[1].links.map((link, index) => (
                <Link
                  key={index}
                  to={`/${link.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-auto mx-auto pt-8 border-t border-white/10">
          <p className="text-sm text-center text-white/80">
            © 2024 ThesisTrack. All rights reserved.
          </p>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block max-w-[1200px] mx-auto px-8 py-16">
        <div className="grid grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-2 space-y-6">
            <div className="bg-gray-200 w-[240px] h-[70px] rounded"></div>
            <p className="text-base leading-relaxed max-w-[400px]">
              Porem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet odio mattis.
            </p>
          </div>

          {/* Links Section */}
          <div className="flex gap-16 col-span-2">
            {/* First Column */}
            <div className="space-y-4">
              {footerLinks[0].links.map((link, index) => (
                <Link
                  key={index}
                  to={`/${link.toLowerCase().replace(/\s+/g, "-")}`}
                  className="block text-white hover:text-gray-200 transition-colors"
                >
                  {link}
                </Link>
              ))}
            </div>
            {/* Second Column */}
            <div className="space-y-4">
              {footerLinks[1].links.map((link, index) => (
                <Link
                  key={index}
                  to={`/${link.toLowerCase().replace(/\s+/g, "-")}`}
                  className="block text-white hover:text-gray-200 transition-colors"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 mx-auto border-t border-white/10">
          <p className="text-sm text-center text-white/80">
            © 2024 ThesisTrack. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

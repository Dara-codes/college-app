import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import KeyFeatures from "../components/features/KeyFeatures";
import HowItWorks from "../components/howItWorks/HowItWorks";
import Testimonials from "../components/testimonials/Testimonials";
import CallToAction from "../components/cta/CallToAction";
import Footer from "../components/footer/Footer";
import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    // Check if there's a section to scroll to
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
  return (
    <div className=" min-h-screen flex flex-col items-center w-full overflow-x-hidden bg-[#FFFEFE] ">
      <Navbar />
      <HeroSection />
      <KeyFeatures />
      <HowItWorks />
      <Testimonials />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Home;

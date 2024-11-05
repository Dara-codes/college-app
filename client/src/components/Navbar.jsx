import React, { Fragment, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth()

  const handleAuth = (path) => {
    navigate(path);
    setIsOpen(false); // Close mobile menu if open
  };

  const scrollToSection = (sectionId) => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: sectionId } });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed w-full top-0 bg-[#296C98] z-50">
      <div className="max-w-[375px] md:max-w-[1512px] mx-auto">
        {/* Main Navbar Content */}
        <div className="px-5 py-4 flex justify-between items-center">
          <Link to="/" className="bg-white px-4 py-2 rounded font-bold">
            Logo
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/about" className="text-white">
              About
            </Link>
            <button
              onClick={() => scrollToSection("features")}
              className="text-white hover:text-gray-200 transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="text-white hover:text-gray-200 transition-colors"
            >
              How it works
            </button>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4 ml-8">
            {
              user ? <div className="text-white">Welcome { user?.firstName }</div> : (<>
              <button
              onClick={() => handleAuth("/auth/register")} // Updated path here
              className="bg-[#F6AD37] text-white px-4 py-2 rounded-[20px]
                hover:bg-[#E5932C] transition-colors"
                >
                  Register
                </button>
                <button
                  onClick={() => handleAuth("/auth/login")} // Also updated login path
                  className="text-white border border-white px-4 py-2 rounded-[20px]
                    hover:bg-white/10 transition-colors"
                >
                  Login
                </button>
              </>)
            }
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            <HiMenu />
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="md:hidden px-5 py-4 bg-[#296C98] border-t border-white/10">
            <div className="flex flex-col gap-4">
              <Link to="/about" className="text-white">
                About
              </Link>
              <button
                onClick={() => scrollToSection("features")}
                className="text-white text-left hover:text-gray-200 transition-colors"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="text-white text-left hover:text-gray-200 transition-colors"
              >
                How it works
              </button>
              <div className="flex flex-col gap-3 pt-3">
                <button
                  onClick={() => handleAuth("/auth/register")} // Updated mobile register path
                  className="bg-[#F6AD37] text-white px-4 py-2 rounded-[20px] text-center
                  hover:bg-[#E5932C] transition-colors"
                >
                  Register
                </button>
                <button
                  onClick={() => handleAuth("/auth/login")} // Updated mobile login path
                  className="text-white border border-white px-4 py-2 rounded-[20px] text-center
                  hover:bg-white/10 transition-colors"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

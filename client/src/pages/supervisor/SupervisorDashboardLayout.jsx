import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { HiMenuAlt2, HiX } from "react-icons/hi";
import { SupervisorDashboardProvider } from "./SupervisorDashboardContext";

const navLinks = [
  { name: "Overview", path: "" },
  { name: "Students", path: "students" },
  { name: "Reviews", path: "reviews" },
  { name: "Training", path: "training" },
  { name: "Reports", path: "reports" },
];

const SupervisorDashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <SupervisorDashboardProvider>
      <div className="flex min-h-screen bg-[#F9FAFB]">
        {/* Sidebar */}
        <aside
          className={`fixed z-30 inset-y-0 left-0 transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:static md:w-64 transition-transform duration-300 bg-[#093B5C] text-white w-64 p-6`}
        >
          <div className="flex justify-between items-center mb-8">
            <span className="text-xl font-bold">Supervisor</span>
            <button
              className="md:hidden text-2xl"
              onClick={() => setSidebarOpen(false)}
            >
              <HiX />
            </button>
          </div>
          <nav>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className={`block px-4 py-2 rounded transition-all duration-200 ${
                      location.pathname.endsWith(link.path)
                        ? "bg-[#F6AD37] text-white"
                        : "hover:bg-[#F6AD37]/80"
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-20 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Topbar */}
          <header className="flex items-center justify-between bg-white shadow px-4 py-3 md:hidden">
            <button
              className="text-2xl text-[#093B5C]"
              onClick={() => setSidebarOpen(true)}
            >
              <HiMenuAlt2 />
            </button>
            <span className="font-semibold">Supervisor Dashboard</span>
            <span />
          </header>
          <main className="flex-1 p-6 animate-fadein">
            <Outlet />
          </main>
        </div>
      </div>
    </SupervisorDashboardProvider>
  );
};

export default SupervisorDashboardLayout;

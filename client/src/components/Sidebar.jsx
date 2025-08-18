import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useFinance } from "../context/FinanceContext";

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useFinance();
  const sidebarLinks = [
    {
      key: "/dashboard",
      label: "Dashboard",
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6m-6 0H7m6 0v6m0 0h6m-6 0H7"
          />
        </svg>
      ),
    },
    {
      key: "/charts",
      label: "Charts",
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11 3v18M4 12h16"
          />
        </svg>
      ),
    },
    {
      key: "/transactions",
      label: "Transactions",
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
          <circle cx="12" cy="12" r="10" />
        </svg>
      ),
    },
    {
      key: "/settings",
      label: "Settings",
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
          <circle cx="12" cy="12" r="10" />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* Sidebar for md+ screens */}
      <aside className="sticky top-0 hidden h-screen w-64 flex-shrink-0 flex-col items-stretch border-r border-gray-100 bg-white px-4 py-10 shadow-xl md:flex">
        <div className="mb-10 flex items-center justify-center">
          <span className="text-2xl font-extrabold tracking-wide text-gray-900 select-none">
            <span className="text-[#FE4A49]">&#9679; </span>SpendWise
          </span>
        </div>
        <nav className="flex w-full flex-col justify-start gap-3">
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.key}
              to={link.key}
              className={({ isActive }) =>
                `flex w-full items-center rounded-xl px-5 py-3 font-medium text-gray-700 transition hover:bg-[#FE4A49]/15 hover:text-[#FE4A49] focus:bg-[#FE4A49]/10 focus:ring-2 focus:ring-[#FE4A49]/30 focus:outline-none ${isActive ? "bg-[#FE4A49]/20 text-[#FE4A49] shadow-md" : ""}`
              }
            >
              {link.icon}
              <span className="ml-2 text-base">{link.label}</span>
            </NavLink>
          ))}
        </nav>
        {localStorage.getItem("token") && (
          <button
            className="mx-auto mt-auto w-[70%] cursor-pointer rounded-[5px] border px-5 py-2 text-sm font-medium text-gray-700 transition hover:text-red-400"
            onClick={logout}
          >
            Logout
          </button>
        )}
      </aside>
      {/* Mobile Bottom Nav */}
      <div className="md:hidden">
        <div className="h-0" />
        <nav className="fixed right-0 bottom-0 left-0 z-30 flex items-center justify-between rounded-t-2xl border-t border-gray-200 bg-white px-2 py-1 shadow-2xl">
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.key}
              to={link.key}
              className={({ isActive }) =>
                `flex flex-1 flex-col items-center justify-center rounded-xl py-2 text-gray-500 transition hover:bg-[#FE4A49]/10 hover:text-[#FE4A49] focus:ring-2 focus:ring-[#FE4A49]/20 focus:outline-none ${isActive ? "bg-[#FE4A49]/10 text-[#FE4A49]" : ""}`
              }
            >
              {link.icon}
              <span className="mt-1 text-xs font-medium md:hidden">
                {link.label}
              </span>
            </NavLink>
          ))}
          {localStorage.getItem("token") && (
            <button
              onClick={logout}
              className="flex flex-1 cursor-pointer flex-col items-center justify-center rounded-xl py-2 text-gray-500 transition hover:bg-[#FE4A49]/10 hover:text-[#FE4A49] focus:ring-2 focus:ring-[#FE4A49]/20 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 4v16"
                />
              </svg>
              <span className="mt-1 text-xs font-medium md:hidden">Logout</span>
            </button>
          )}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;

import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { CiMenuFries } from "react-icons/ci";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useFinance } from "../context/FinanceContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [hovered, setHovered] = React.useState(null);
  const [isMdOrLarger, setIsMdOrLarger] = React.useState(
    () => window.innerWidth >= 768,
  );
  const navigate = useNavigate();
  const { logout } = useFinance();

  React.useEffect(() => {
    const handleResize = () => {
      setIsMdOrLarger(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = [
    { to: "/about", label: "About Us" },
    { to: "/contact", label: "Contact Us" },
  ];

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 20) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });

  return (
    <motion.nav
      animate={{
        boxShadow: scrolled
          ? "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)"
          : "none",
        width: isMdOrLarger ? (scrolled ? "58%" : "80%") : "90%",
        marginLeft: isMdOrLarger ? "auto" : "auto",
        marginRight: isMdOrLarger ? "auto" : "auto",
        y: scrolled ? 8 : 0,
        borderRadius: scrolled ? "20px" : "16px",
      }}
      className="fixed inset-x-0 top-0 z-50 my-5 flex h-20 items-center justify-between bg-white px-7 shadow-lg"
    >
      <Link to={"/"}>
        <h1 className="text-xl tracking-wide md:text-2xl lg:text-3xl">
          Spend<span className="text-[#FE4A49]">Wise</span>
        </h1>
      </Link>
      <div className="hidden items-center justify-center gap-4 sm:flex">
        <ul className="flex items-center text-base font-medium tracking-normal">
          {navLinks.map((item, idx) => (
            <NavLink
              key={idx}
              to={item.to}
              className="relative px-4 py-2 text-sm"
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => {
                setTimeout(() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }, 0);
              }}
            >
              {hovered === idx && (
                <motion.span
                  layoutId="hovered-span"
                  className="absolute inset-0 h-full w-full rounded-md bg-neutral-100"
                ></motion.span>
              )}
              <span className="relative z-10">{item.label}</span>
            </NavLink>
          ))}
        </ul>
        {!localStorage.getItem("token") ? (
          <button
            className="cursor-pointer rounded bg-[#FE4A49] px-5 py-2 text-sm font-medium text-white hover:bg-red-600/80"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        ) : (
          <button
            className="cursor-pointer rounded border border-gray-200 bg-white px-5 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
            onClick={logout}
          >
            Logout
          </button>
        )}
      </div>
      {/* hamburger menu for small screens */}
      <CiMenuFries
        onClick={() => setIsOpen(!isOpen)}
        className="block h-7 w-7 cursor-pointer sm:hidden"
      />
      {/* navbar menu for small screens */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white px-12 py-6 transition-all duration-200">
          <div className="mt-4 mb-12 flex items-center justify-between">
            <h1 className="text-xl md:text-2xl lg:text-3xl">
              Welcome,{" "}
              <span className="font-semibold text-[#FE4A49]">Anish 👋</span>
            </h1>
            <button
              onClick={() => setIsOpen(false)}
              className="self-end text-3xl text-gray-700 focus:outline-none"
              aria-label="Close menu"
            >
              &times;
            </button>
          </div>
          <ul className="flex flex-col gap-6 text-lg font-medium">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `rounded px-3 py-2 transition duration-200 ease-in-out ${isActive ? "bg-[rgb(241,238,238)]" : ""}`
                }
                onClick={() => {
                  setIsOpen(false);
                  setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }, 0);
                }}
              >
                {label}
              </NavLink>
            ))}
          </ul>
          {/* Optionally hide Login if logged in */}
          {!localStorage.getItem("token") ? (
            <button
              className="mt-8 w-full rounded bg-[#FE4A49] px-7 py-2 font-medium text-white hover:bg-red-600/80"
              onClick={() => {
                setIsOpen(false);
                navigate("/login");
              }}
            >
              Login
            </button>
          ) : (
            <button
              className="mt-8 w-full rounded border border-gray-200 bg-white px-7 py-2 font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              onClick={() => {
                setIsOpen(false);
                logout();
              }}
            >
              Logout
            </button>
          )}
          <div>
            <p className="absolute bottom-8 left-0 mt-6 w-full text-center text-sm text-gray-500">
              &copy; 2023 SpendWise. All rights reserved.
            </p>
          </div>
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;

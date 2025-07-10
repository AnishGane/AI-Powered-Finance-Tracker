import React from "react";
import Container from "../util/Container";
import { NavLink, Link } from "react-router-dom";
import { CiMenuFries } from "react-icons/ci";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      className="sticky top-4 mx-auto mb-5"
      initial={{ borderRadius: 16, maxWidth: "100%" }}
      animate={{
        borderRadius: scrolled ? 70 : 16,
        maxWidth: scrolled ? "28rem" : "90%", // 28rem = 448px (like max-w-xl)
      }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      style={{ maxWidth: "100%" }}
    >
      <Container className="flex h-20 w-full items-center justify-between rounded-xl bg-white px-7 shadow-lg sm:max-w-[80%]">
        <Link to={"/"}>
          <h1 className="text-xl tracking-wide md:text-2xl lg:text-3xl">
            Spend<span className="text-[#FE4A49]">Wise</span>
          </h1>
        </Link>
        <div className="hidden items-center justify-center gap-16 sm:flex">
          <ul className="flex items-center text-base font-medium tracking-normal">
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `rounded px-3 py-1 transition duration-200 ease-in-out ${isActive ? "bg-[rgb(241,238,238)]" : ""}`
              }
            >
              About Us
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `rounded px-3 py-1 transition duration-200 ease-in-out ${isActive ? "bg-[rgb(241,238,238)]" : ""}`
              }
            >
              Contact Us
            </NavLink>
          </ul>
          <button className="cursor-pointer rounded bg-[#FE4A49] px-7 py-2 font-medium text-white hover:bg-red-600/80">
            Login
          </button>
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
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `rounded px-3 py-2 transition duration-200 ease-in-out ${isActive ? "bg-[rgb(241,238,238)]" : ""}`
                }
                onClick={() => setIsOpen(false)}
              >
                About Us
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `rounded px-3 py-2 transition duration-200 ease-in-out ${isActive ? "bg-[rgb(241,238,238)]" : ""}`
                }
                onClick={() => setIsOpen(false)}
              >
                Contact Us
              </NavLink>
            </ul>
            <button
              className="mt-8 w-full rounded bg-[#FE4A49] px-7 py-2 font-medium text-white hover:bg-red-600/80"
              onClick={() => setIsOpen(false)}
            >
              Login
            </button>
            <div>
              <p className="absolute bottom-8 left-0 mt-6 w-full text-center text-sm text-gray-500">
                &copy; 2023 SpendWise. All rights reserved.
              </p>
            </div>
          </div>
        )}
      </Container>
    </motion.div>
  );
};

export default Navbar;

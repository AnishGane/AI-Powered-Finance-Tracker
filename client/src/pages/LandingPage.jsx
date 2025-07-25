import React from "react";
import { Link } from "react-router-dom";
import Testimonials from "../components/Testimonials";
import { motion } from "framer-motion";

const features = [
  {
    title: "Track Income & Expenses",
    desc: "Easily log your income and expenses, categorize transactions, and stay on top of your finances.",
    icon: (
      <svg
        className="h-10 w-10 text-[#FE4A49]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0V4m0 7v9m-7-7h14"
        />
      </svg>
    ),
  },
  {
    title: "Financial Analytics",
    desc: "Visualize your spending with interactive charts and gain insights into your financial habits.",
    icon: (
      <svg
        className="h-10 w-10 text-[#FE4A49]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 17v-2a4 4 0 014-4h14"
        />
      </svg>
    ),
  },
  {
    title: "AI Chatbot Advisor",
    desc: "Get personalized saving and budgeting advice from our smart AI-powered chatbot.",
    icon: (
      <svg
        className="h-10 w-10 text-[#FE4A49]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 20h9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m0 0H3" />
      </svg>
    ),
  },
  {
    title: "Predictive Analytics",
    desc: "Forecast your future expenses and plan ahead with our predictive analytics tools.",
    icon: (
      <svg
        className="h-10 w-10 text-[#FE4A49]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 17V9a3 3 0 016 0v8"
        />
      </svg>
    ),
  },
];

const heroVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeInOut" },
  },
};

const featureVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.18 + 0.2,
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const buttonVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.02, boxShadow: "0 8px 24px rgba(254,74,73,0.15)" },
};

const LandingPage = () => {
  return (
    <div className="flex flex-col pt-20">
      {/* Hero Section */}
      <motion.section
        className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center"
        variants={heroVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 md:text-6xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Take Control of Your <span className="text-[#FE4A49]">Finances</span>{" "}
          with Spend<span className="font-medium text-[#FE4A49]">Wise</span>
        </motion.h1>
        <motion.p
          className="mb-8 max-w-2xl text-lg text-gray-600 md:text-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        >
          SpendWise helps you track spending, chat with an AI advisor, and plan
          your financial future—all in one secure platform.
        </motion.p>
        <motion.div
          variants={buttonVariants}
          initial="rest"
          whileHover="hover"
          animate="rest"
        >
          <Link
            to="/login"
            className="rounded bg-[#FE4A49] px-8 py-3 text-lg font-semibold text-white shadow-lg transition hover:bg-red-600/90 focus:ring-2 focus:ring-[#FE4A49] focus:ring-offset-2 focus:outline-none"
          >
            Get Started
          </Link>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <section className="mx-auto w-full max-w-6xl px-4 py-12">
        <h2 className="mb-10 text-center text-3xl font-bold text-gray-800 md:text-4xl">
          Why Choose <span className="text-[#FE4A49]">SpendWise?</span>
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              className="flex flex-col items-center rounded-xl bg-white p-6 shadow-md transition duration-150 ease-in-out hover:scale-[1.02] hover:shadow-xl"
              custom={idx}
              variants={featureVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#FE4A49]/10">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-center text-lg font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="text-center text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />
    </div>
  );
};

export default LandingPage;

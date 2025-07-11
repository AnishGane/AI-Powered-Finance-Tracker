import React from "react";
import { motion } from "framer-motion";

const team = [
  {
    name: "Anish Gane",
    role: "Founder & Lead Developer",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: "Passionate about building AI-powered solutions for personal finance.",
  },
  {
    name: "Priya Sharma",
    role: "UI/UX Designer",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    bio: "Designs intuitive and beautiful user experiences.",
  },
  {
    name: "Rahul Verma",
    role: "Backend Engineer",
    img: "https://randomuser.me/api/portraits/men/65.jpg",
    bio: "Ensures robust and scalable backend systems.",
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

const missionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.2, ease: "easeInOut" },
  },
};

const teamContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.3,
    },
  },
};

const teamCard = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const About = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-[#F7F4EA] px-4 pt-14 pb-16">
      {/* Hero Section */}
      <motion.section
        className="mt-24 mb-12 w-full max-w-4xl text-center"
        variants={heroVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
          About <span className="text-[#FE4A49]">SpendWise</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 md:text-xl">
          SpendWise is an AI-powered finance tracker designed to help you take
          control of your finances, make smarter decisions, and achieve your
          financial goals with ease.
        </p>
      </motion.section>

      {/* Mission Section */}
      <motion.section
        className="mb-16 w-full max-w-3xl rounded-2xl bg-white p-8 shadow-lg"
        variants={missionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <h2 className="mb-3 text-2xl font-semibold text-gray-800">
          Our Mission
        </h2>
        <p className="text-base text-gray-600 md:text-lg">
          Our mission is to empower individuals to manage their money
          effortlessly using the latest advancements in artificial intelligence.
          We believe everyone deserves financial clarity and peace of mind.
        </p>
      </motion.section>

      {/* Team Section */}
      <section className="w-full max-w-5xl">
        <h2 className="mb-8 text-center text-2xl font-semibold text-gray-800">
          Meet the Team
        </h2>
        <motion.div
          className="flex flex-wrap justify-center gap-8"
          variants={teamContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {team.map((member) => (
            <motion.div
              key={member.name}
              className="flex w-72 flex-col items-center rounded-xl bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-xl"
              variants={teamCard}
            >
              <img
                src={member.img}
                alt={member.name}
                className="mb-4 h-24 w-24 rounded-full border-4 border-[#FE4A49] object-cover"
              />
              <h3 className="mb-1 text-lg font-bold text-gray-900">
                {member.name}
              </h3>
              <p className="mb-2 font-medium text-[#FE4A49]">{member.role}</p>
              <p className="text-center text-sm text-gray-600">{member.bio}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default About;

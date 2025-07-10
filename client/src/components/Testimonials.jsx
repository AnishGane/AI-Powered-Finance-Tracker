import React from "react";

const testimonials = [
  {
    name: "Ravi S.",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
    quote:
      "SpendWise made it so easy to track my expenses and actually save money. The charts are super helpful!",
  },
  {
    name: "Priya K.",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    quote:
      "The AI chatbot gave me personalized tips that actually worked. I love the predictive analytics too!",
  },
  {
    name: "Amit P.",
    img: "https://randomuser.me/api/portraits/men/65.jpg",
    quote:
      "I finally feel in control of my finances. SpendWise is a must-have for anyone who wants to budget smarter.",
  },
  {
    name: "Sara M.",
    img: "https://randomuser.me/api/portraits/women/68.jpg",
    quote:
      "The interface is so clean and easy to use. I love seeing my spending breakdown in real time!",
  },
  {
    name: "John D.",
    img: "https://randomuser.me/api/portraits/men/41.jpg",
    quote:
      "SpendWise's predictive analytics helped me plan for upcoming expenses. Highly recommended!",
  },
  {
    name: "Meena T.",
    img: "https://randomuser.me/api/portraits/women/55.jpg",
    quote:
      "The AI advice is spot on. I feel more confident about my savings goals now.",
  },
  {
    name: "Carlos G.",
    img: "https://randomuser.me/api/portraits/men/78.jpg",
    quote:
      "I use SpendWise every day. It's the best finance app I've tried so far!",
  },
  {
    name: "Emily R.",
    img: "https://randomuser.me/api/portraits/women/12.jpg",
    quote:
      "Budgeting used to be stressful, but SpendWise makes it simple and even fun!",
  },
];

const Testimonials = () => {
  // Duplicate testimonials for seamless looping
  const marqueeTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="mx-auto w-full max-w-6xl overflow-hidden px-4 py-12">
      <h2 className="mb-10 text-center text-3xl font-bold text-gray-800 md:text-4xl">
        What Our Users Say
      </h2>
      <div className="relative w-full rounded-2xl">
        {/* Decorative blurred background shape for extra depth */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40 opacity-60 blur-3xl" />
        {/* Left blur overlay (realistic, wide, multi-stop, extra soft) */}
        <div className="pointer-events-none absolute top-0 -left-32 z-20 h-full w-80 rounded-full bg-gradient-to-r from-white/80 via-white/90 via-70% to-transparent blur-md" />
        {/* Right blur overlay (realistic, wide, multi-stop, extra soft) */}
        <div className="pointer-events-none absolute top-0 -right-32 z-20 h-full w-80 rounded-full bg-gradient-to-l from-white/80 via-white/90 via-70% to-transparent blur-md" />
        <div className="marquee relative z-10">
          {marqueeTestimonials.map((t, idx) => (
            <div
              key={idx}
              className="mx-4 flex w-72 flex-col items-center rounded-xl bg-white/70 p-6 shadow-lg backdrop-blur-md transition duration-150 ease-in-out hover:scale-[1.04] hover:bg-white/90 hover:shadow-lg"
              style={{ border: "1px solid rgba(254,74,73,0.08)" }}
            >
              <img
                src={t.img}
                alt={t.name + " avatar"}
                className="mb-4 h-16 w-16 rounded-full object-cover shadow"
              />
              <p className="mb-2 text-center text-gray-700">“{t.quote}”</p>
              <span className="text-sm font-semibold text-[#FE4A49]">
                {t.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

import React from "react";

const Contact = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-[#F7F4EA] px-4 pt-20 pb-16">
      {/* Hero Section */}
      <section className="mt-16 mb-10 w-full max-w-2xl text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
          Contact <span className="text-[#FE4A49]">Us</span>
        </h1>
        <p className="mx-auto max-w-xl text-lg text-gray-600 md:text-xl">
          Have a question, feedback, or need support? Fill out the form below or
          reach out to us directly.
        </p>
      </section>

      {/* Contact Form & Info */}
      <section className="flex w-full max-w-4xl flex-col gap-10 rounded-2xl bg-white p-8 shadow-lg md:flex-row">
        {/* Contact Form */}
        <form className="flex flex-1 flex-col gap-5">
          <div>
            <label
              className="mb-1 block font-medium text-gray-700"
              htmlFor="name"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-[#FE4A49] focus:ring-2 focus:ring-[#FE4A49]/20 focus:outline-none"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label
              className="mb-1 block font-medium text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-[#FE4A49] focus:ring-2 focus:ring-[#FE4A49]/20 focus:outline-none"
              placeholder="you@email.com"
            />
          </div>
          <div>
            <label
              className="mb-1 block font-medium text-gray-700"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2 transition focus:border-[#FE4A49] focus:ring-2 focus:ring-[#FE4A49]/20 focus:outline-none"
              placeholder="How can we help you?"
            />
          </div>
          <button
            type="submit"
            className="mt-2 rounded bg-[#FE4A49] px-8 py-3 text-lg font-semibold text-white shadow-lg transition hover:bg-red-600/90 focus:ring-2 focus:ring-[#FE4A49] focus:ring-offset-2 focus:outline-none"
          >
            Send Message
          </button>
        </form>
        {/* Contact Info */}
        <div className="flex flex-1 flex-col justify-center gap-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#FE4A49]/10 text-[#FE4A49]">
              <svg
                width="22"
                height="22"
                fill="none"
                viewBox="0 0 24 24"
                className="h-7 w-7"
              >
                <rect width="22" height="22" rx="6" fill="none" />
                <path
                  d="M4 7.5V16a2 2 0 002 2h12a2 2 0 002-2V7.5M4 7.5l8 5 8-5M4 7.5V6a2 2 0 012-2h12a2 2 0 012 2v1.5"
                  stroke="#FE4A49"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </span>
            <span className="text-base text-gray-700">
              support@spendwise.com
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#FE4A49]/10 text-[#FE4A49]">
              {/* Location SVG icon */}
              <svg
                width="22"
                height="22"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className="h-7 w-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21c-4.418 0-8-5.373-8-9.5A8 8 0 0112 3a8 8 0 018 8.5c0 4.127-3.582 9.5-8 9.5zm0-7a2 2 0 100-4 2 2 0 000 4z"
                />
              </svg>
            </span>
            <span className="text-base text-gray-700">
              123 Main Street, New Delhi, India
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#FE4A49]/10 text-[#FE4A49]">
              <svg
                width="22"
                height="22"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M22 16.92v3a2 2 0 01-2.18 2A19.86 19.86 0 012 5.18 2 2 0 014 3h3a2 2 0 012 1.72c.13.93.37 1.82.7 2.67a2 2 0 01-.45 2.11l-1.27 1.27a16 16 0 006.6 6.6l1.27-1.27a2 2 0 012.11-.45c.85.33 1.74.57 2.67.7A2 2 0 0122 16.92z"
                />
              </svg>
            </span>
            <span className="text-base text-gray-700">+91 98765 43210</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

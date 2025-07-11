import React from "react";

const Footer = () => {
  return (
    <footer className="mt-12 w-full border-t border-gray-200 bg-white py-6">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-gray-900">
            Spend<span className="text-[#FE4A49]">Wise</span>
          </span>
          <span className="ml-2 hidden text-sm font-medium text-gray-400 md:inline">
            AI Powered Finance Tracker
          </span>
        </div>
        <div className="flex gap-4">
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 transition-colors duration-200 hover:text-[#FE4A49]"
          >
            <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195A4.92 4.92 0 0 0 16.616 3c-2.73 0-4.942 2.21-4.942 4.932 0 .386.045.763.127 1.124C7.728 8.807 4.1 6.884 1.671 3.965c-.423.722-.666 1.561-.666 2.475 0 1.708.87 3.216 2.188 4.099a4.904 4.904 0 0 1-2.237-.616c-.054 2.281 1.581 4.415 3.949 4.89-.386.104-.793.16-1.213.16-.297 0-.583-.028-.862-.08.584 1.823 2.28 3.152 4.29 3.188A9.868 9.868 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.209c9.057 0 14.009-7.496 14.009-13.986 0-.213-.005-.425-.014-.636A9.936 9.936 0 0 0 24 4.557z" />
            </svg>
          </a>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 transition-colors duration-200 hover:text-[#FE4A49]"
          >
            <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.686-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.699 1.028 1.593 1.028 2.686 0 3.847-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.744 0 .267.18.578.688.48C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
            </svg>
          </a>
        </div>
        <div className="text-center text-sm text-gray-400 md:text-right">
          &copy; {new Date().getFullYear()} SpendWise. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

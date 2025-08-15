import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white px-4 py-4 sm:py-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2 sm:gap-4 text-center sm:text-left">
        <p className="text-sm sm:text-base">
          Copyright &copy; {currentYear} Get me a chai — All rights reserved!
        </p>
        <p className="text-xs sm:text-sm text-gray-400">
          Made with ❤️ and extra chai ☕
        </p>
      </div>
    </footer>
  );
};

export default Footer;

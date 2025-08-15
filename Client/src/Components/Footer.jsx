import React from "react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="footer flex flex-col sm:flex-row justify-between dark:bg-gray-900/80 items-center  text-neutral-content p-4">
      {/* Left side */}
      <aside className="flex items-center gap-2">
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fillRule="evenodd"
          clipRule="evenodd"
          className="fill-current"
        >
        </svg>
        <p>© {new Date().getFullYear()} Local Food Waste Platform. All rights reserved.</p>
      </aside>

      {/* Right side */}
      <nav className="flex items-center gap-4 mt-4 sm:mt-0">
        <Link to="/about" className="hover:underline">
          About
        </Link>
        <Link to="/contact" className="hover:underline">
          Contact
        </Link>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <svg className="fill-current w-6 h-6" viewBox="0 0 24 24">
          </svg>
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
          <svg className="fill-current w-6 h-6" viewBox="0 0 24 24">
          </svg>
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <svg className="fill-current w-6 h-6" viewBox="0 0 24 24">
          </svg>
        </a>
      </nav>
    </footer>
  );
};

export default Footer;

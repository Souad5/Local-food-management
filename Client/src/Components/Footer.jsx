import React from "react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="footer flex flex-col sm:flex-row justify-between items-center p-4text-neutral-content py-5">
      {/* Left side */}
      <aside className="flex items-center gap-2">
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
        >
          <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" />
        </svg>
        <p className="text-sm">
          © {new Date().getFullYear()} Local Food Waste Platform. All rights reserved.
        </p>
      </aside>

      {/* Right side */}
      <nav className="flex items-center gap-4 mt-4 sm:mt-0">
        <Link to="/about" className="hover:underline">
          About
        </Link>
        <Link to="/contact" className="hover:underline">
          Contact
        </Link>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724 9.864 9.864 0 0 1-3.127 1.195 4.916 4.916 0 0 0-8.384 4.482A13.939 13.939 0 0 1 1.671 3.149a4.916 4.916 0 0 0 1.523 6.562 4.903 4.903 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.935 4.935 0 0 1-2.224.084 4.919 4.919 0 0 0 4.59 3.417 9.867 9.867 0 0 1-6.102 2.105c-.395 0-.787-.023-1.175-.068A13.945 13.945 0 0 0 7.548 21c9.142 0 14.307-7.721 13.995-14.646A10.025 10.025 0 0 0 24 4.557z" />
          </svg>
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a2.988 2.988 0 0 0-2.108-2.11C19.588 3.5 12 3.5 12 3.5s-7.588 0-9.39.576a2.988 2.988 0 0 0-2.108 2.11A31.23 31.23 0 0 0 0 12a31.23 31.23 0 0 0 .502 5.814 2.988 2.988 0 0 0 2.108 2.11c1.802.576 9.39.576 9.39.576s7.588 0 9.39-.576a2.988 2.988 0 0 0 2.108-2.11A31.23 31.23 0 0 0 24 12a31.23 31.23 0 0 0-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 transition-colors">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.407.593 24 1.324 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.657-4.788 1.325 0 2.462.099 2.794.143v3.24h-1.918c-1.504 0-1.796.715-1.796 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.324-.593 1.324-1.324V1.324C24 .593 23.407 0 22.676 0z" />
          </svg>
        </a>
      </nav>
    </footer>
  );
};

export default Footer;

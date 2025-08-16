import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { FaMoon } from "react-icons/fa";
import { IoMdSunny } from "react-icons/io";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLogout = () => {
    logout().catch(console.error);
  };

  const navLinkStyle = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
      isActive
        ? "text-orange-500 shadow-sm"
        : "text-base-content  hover:text-primary hover:bg-primary/10"
    }`;

  return (
    <header className="fixed top-0 left-0 w-full bg-base-100/80 backdrop-blur-lg border-b border-base-300 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-extrabold tracking-tight text-primary flex items-center gap-2"
          >
            🍽 Local Food
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-4">
            <NavLink to="/" className={navLinkStyle}>
              Home
            </NavLink>
            <NavLink to="/all-donations" className={navLinkStyle}>
              All Donations
            </NavLink>
            <NavLink to="/about" className={navLinkStyle}>
              About
            </NavLink>
            {user ? (
              <>
              <NavLink to="/profiles" className={navLinkStyle}>
                My Profile
              </NavLink>
              <NavLink to="/dashboard" className={navLinkStyle}>
                      Dashboard
                    </NavLink></>
            ) : (
              <NavLink to="/register" className={navLinkStyle}>
                Register
              </NavLink>
            )}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={handleToggle}
              className="btn btn-circle swap swap-rotate"
            >
              {theme === "dark" ? (
                <IoMdSunny />
              ) : (
                <FaMoon />
              )}
            </button>

            {/* User */}
            {user ? (
              <div className="flex items-center gap-3">
                <span className="hidden sm:block  font-semibold">
                  {user.displayName || "User"}
                </span>
                <img
                  src={user.photoURL || "https://i.ibb.co/ZYW3VTp/brown-brim.png"}
                  alt="User"
                  className="w-10 h-10 rounded-full border border-primary/30 shadow-md"
                />
                <button
                  onClick={handleLogout}
                  className="btn btn-sm btn-error"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn btn-sm btn-primary">
                Login
              </Link>
            )}

            {/* Mobile Menu */}
            <div className="lg:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="btn btn-ghost btn-circle"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                  ></path>
                </svg>
              </button>
              {menuOpen && (
                <div className="absolute right-4 top-16 w-56 bg-base-100 rounded-lg shadow-lg p-4 flex flex-col gap-3 z-50">
                  <NavLink to="/" className={navLinkStyle}>
                    Home
                  </NavLink>
                  <NavLink to="/all-donations" className={navLinkStyle}>
                    All Donations
                  </NavLink>
                  <NavLink to="/about" className={navLinkStyle}>
                    About
                  </NavLink>
                  {user ? (
                    <>
                    <NavLink to="/profile" className={navLinkStyle}>
                      My Profile
                    </NavLink>
                    <NavLink to="/dashboard" className={navLinkStyle}>
                      Dashboard
                    </NavLink>
                    </>
                  ) : (
                    <NavLink to="/register" className={navLinkStyle}>
                      Register
                    </NavLink>
                  )}
                  {user && (
                    <button
                      onClick={handleLogout}
                      className="text-red-500 hover:text-red-600 mt-2 text-left"
                    >
                      Logout
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

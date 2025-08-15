import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../Context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout().catch((error) => console.error(error));
  };

  const navLinkStyle = ({ isActive }) =>
    `relative px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
      isActive
        ? "text-primary-content bg-primary/80 shadow-sm"
        : "text-base-content hover:text-primary hover:bg-primary/10"
    }`;

  const navLinks = (
    <>
      <NavLink to="/" className={navLinkStyle}>
        Home
      </NavLink>
      <NavLink to="/all-donations" className={navLinkStyle}>
        All Donations
      </NavLink>

      {user ? (
        <>
          <NavLink to="/dashboard" className={navLinkStyle}>
            Dashboard
          </NavLink>
          <NavLink to="/my-profile" className={navLinkStyle}>
            My Profile
          </NavLink>
          <NavLink to="/settings" className={navLinkStyle}>
            Settings
          </NavLink>
        </>
      ) : (
        <NavLink to="/register" className={navLinkStyle}>
          Register
        </NavLink>
      )}
    </>
  );

  return (
    <header className="fixed top-0 left-0 w-full bg-base-100/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-base-300 dark:border-gray-700 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl sm:text-2xl font-extrabold tracking-tight text-primary flex items-center gap-2"
          >
            🍽 Local Food
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-2">{navLinks}</div>

          {/* User Section */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex flex-col items-end text-right">
                  <span className="text-sm font-semibold text-base-content dark:text-gray-200">
                    {user.displayName || "User"}
                  </span>
                </div>
                <img
                  src={
                    user.photoURL || "https://i.ibb.co/ZYW3VTp/brown-brim.png"
                  }
                  alt="User"
                  className="w-10 h-10 rounded-full border border-primary/30 shadow-md"
                />
                <button
                  onClick={handleLogout}
                  className="btn btn-sm btn-error shadow hover:scale-105 transition-transform"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="btn btn-sm btn-primary shadow hover:scale-105 transition-transform"
              >
                Login
              </Link>
            )}

            {/* Mobile Menu */}
            <div className="lg:hidden dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-base-content dark:text-gray-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-3 shadow-lg rounded-xl w-56 bg-base-100 dark:bg-gray-800 border border-base-300 dark:border-gray-700"
              >
                {navLinks}
                <div className="mt-2 border-t border-base-300 dark:border-gray-600 pt-2">
                  {user ? (
                    <button
                      onClick={handleLogout}
                      className="text-red-500 hover:text-red-600 w-full text-left"
                    >
                      Logout
                    </button>
                  ) : (
                    <Link
                      to="/login"
                      className="hover:text-primary transition-colors"
                    >
                      Login
                    </Link>
                  )}
                </div>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

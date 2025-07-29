import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../Context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout()
      .then(() => {})
      .catch((error) => (error));
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/" className="font-semibold">
          Home
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/all-donations" className="font-semibold">
              All Donations
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard" className="font-semibold">
              Dashboard
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 px-4 lg:w-7xl mx-auto">
      <div className="navbar-start">
        <Link to="/" className="text-xl font-bold flex items-center gap-2">
          <span>Local Food</span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-3">{navLinks}</ul>
      </div>

      <div className="navbar-end">
        {user ? (
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col justify-center items-end text-right">
              <img
                src={user.photoURL || "https://i.ibb.co/ZYW3VTp/brown-brim.png"}
                alt="User"
                className="w-10 h-10 rounded-full"
              />
              <p className="text-sm font-medium">
                {user.displayName || "User"}
              </p>
            </div>
            <button onClick={handleLogout} className="text-xs btn btn-error">
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="btn btn-sm btn-primary">
            Login
          </Link>
        )}
      </div>

      {/* Mobile Menu */}
      <div className="dropdown dropdown-end lg:hidden">
        <label tabIndex={0} className="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
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
          className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-10"
        >
          {navLinks}
          {user ? (
            <li>
              <button onClick={handleLogout} className="text-red-500">
                Logout
              </button>
            </li>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

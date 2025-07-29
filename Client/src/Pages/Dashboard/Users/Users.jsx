// UserDashboard.jsx
import React from "react";
import { NavLink, Outlet } from "react-router";
import useRole from './../../../Context/useRole';
import LoadingSpinner from "../../../Api/LoadingSpinner";

const UserDashboard = () => {
  const [role, setRole] = useRole()
  if (role !== "User") {
    return <div className="p-5 text-center">You do not have access to this dashboard.</div>;
  }
  if(setRole) return <div className="p-5 text-center"><LoadingSpinner/></div>;
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-60 bg-gray-100 p-6 flex flex-col justify-between">
        <div>
          <h2 className="font-bold text-lg mb-6 text-center">User Dashboard</h2>
          <nav className="flex flex-col gap-3">
            {/* <NavLink
              to="profile"
              className={({ isActive }) =>
                isActive ? "btn btn-info w-full" : "btn btn-outline w-full"
              }
            >
              My Profile
            </NavLink> */}
            <NavLink
              to="request-charity"
              className={({ isActive }) =>
                isActive ? "btn btn-info w-full" : "btn btn-outline w-full"
              }
            >
              Request Charity Role
            </NavLink>
            <NavLink
              to="favorites"
              className={({ isActive }) =>
                isActive ? "btn btn-info w-full" : "btn btn-outline w-full"
              }
            >
              Favorites
            </NavLink>
            <NavLink
              to="reviews"
              className={({ isActive }) =>
                isActive ? "btn btn-info w-full" : "btn btn-outline w-full"
              }
            >
              My Reviews
            </NavLink>
            <NavLink
              to="transactions"
              className={({ isActive }) =>
                isActive ? "btn btn-info w-full" : "btn btn-outline w-full"
              }
            >
              Transaction History
            </NavLink>
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default UserDashboard;

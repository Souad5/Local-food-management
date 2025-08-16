import React from "react";
import { NavLink, Outlet } from "react-router";
import useRole from './../../../Context/useRole';
import LoadingSpinner from "../../../Api/LoadingSpinner";

const UserDashboard = () => {
  const [role, isRoleLoading] = useRole();

  if (isRoleLoading) return <div className="flex justify-center items-center min-h-screen"><LoadingSpinner /></div>;
  if (role !== "User") {
    return <div className="p-5 text-center text-red-500 text-lg">You do not have access to this dashboard.</div>;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row ">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64   p-6 flex flex-col justify-between shadow-md md:sticky md:top-0 md:h-screen z-20">
        <h2 className="font-bold text-xl mb-6 text-center">User Dashboard</h2>
        <nav className="flex flex-col gap-3">
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
          <NavLink
            to="over-view"
            className={({ isActive }) =>
              isActive ? "btn btn-info w-full" : "btn btn-outline w-full"
            }
          >
            Overview
          </NavLink>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 md:p-8 overflow-auto space-y-6">
        <Outlet />
      </main>
    </div>
  );
};

export default UserDashboard;

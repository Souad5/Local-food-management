import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import useRole from "../../Context/useRole";
import LoadingSpinner from "../../Api/LoadingSpinner";

const DashBoard = () => {
  const [role, isRoleLoading] = useRole();
  if (isRoleLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white dark:bg-gray-800 p-6 flex flex-col justify-between shadow-md md:sticky md:top-0 md:h-screen z-20">
        <div>
          <NavLink
            to="/"
            className="font-bold text-xl btn btn-info w-full mb-6 text-center"
          >
            Local Food
          </NavLink>

          <nav className="flex flex-col gap-3">
            {role === "User" && (
              <NavLink
                to="users"
                className={({ isActive }) =>
                  isActive
                    ? "btn btn-info w-full"
                    : "btn btn-outline w-full"
                }
              >
                Users
              </NavLink>
            )}
            {role === "Restaurant" && (
              <NavLink
                to="restaurants"
                className={({ isActive }) =>
                  isActive
                    ? "btn btn-info w-full"
                    : "btn btn-outline w-full"
                }
              >
                Restaurants
              </NavLink>
            )}
            {role === "Charity" && (
              <NavLink
                to="charity"
                className={({ isActive }) =>
                  isActive
                    ? "btn btn-info w-full"
                    : "btn btn-outline w-full"
                }
              >
                Charity
              </NavLink>
            )}
            {role === "Admin" && (
              <NavLink
                to="admin"
                className={({ isActive }) =>
                  isActive
                    ? "btn btn-info w-full"
                    : "btn btn-outline w-full"
                }
              >
                Admin
              </NavLink>
            )}
          </nav>
        </div>

        <div className="flex flex-col gap-3 mt-10">
          <Link to="profile">
            <button className="btn btn-info w-full">Profile</button>
          </Link>
          <Link to="/">
            <button className="btn btn-error w-full">Logout</button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 overflow-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Welcome to Dashboard
        </h1>
        <div className="space-y-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashBoard;

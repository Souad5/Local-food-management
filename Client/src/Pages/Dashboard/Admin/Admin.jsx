// Admin.jsx
import React from "react";
import { NavLink, Outlet } from "react-router";
import useRole from "../../../Context/useRole";
import LoadingSpinner from "../../../Api/LoadingSpinner";

const Admin = () => {
  const [role, setRole] = useRole()
  if (role !== "Admin") {
    return <div className="p-5 text-center">You do not have access to this dashboard.</div>;
  }
  if(setRole) return <div className="p-5 text-center"><LoadingSpinner/></div>;
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64  p-6">
        <h2 className="text-xl font-bold mb-6 text-center">Admin Dashboard</h2>
        <nav className="flex flex-col gap-3">
          {/* <NavLink
            to="profile"
            className={({ isActive }) =>
              isActive ? "btn btn-info w-full" : "btn btn-outline w-full"
            }
          >
            Admin Profile
          </NavLink> */}
          <NavLink
            to="manage-donations"
            className={({ isActive }) =>
              isActive ? "btn btn-info w-full" : "btn btn-outline w-full"
            }
          >
            Manage Donations
          </NavLink>
          <NavLink
            to="manage-users"
            className={({ isActive }) =>
              isActive ? "btn btn-info w-full" : "btn btn-outline w-full"
            }
          >
            Manage Users
          </NavLink>
          <NavLink
            to="manage-role-requests"
            className={({ isActive }) =>
              isActive ? "btn btn-info w-full" : "btn btn-outline w-full"
            }
          >
            Manage Role Requests
          </NavLink>
          <NavLink
            to="manage-requests"
            className={({ isActive }) =>
              isActive ? "btn btn-info w-full" : "btn btn-outline w-full"
            }
          >
            Manage Requests
          </NavLink>
          <NavLink
            to="feature-donations"
            className={({ isActive }) =>
              isActive ? "btn btn-info w-full" : "btn btn-outline w-full"
            }
          >
            Feature Donations
          </NavLink>
          <NavLink
            to="over-view-admin"
            className={({ isActive }) =>
              isActive ? "btn btn-info w-full" : "btn btn-outline w-full"
            }
          >
            Overview
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Admin;

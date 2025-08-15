import React from "react";
import { NavLink, Outlet } from "react-router";
import useRole from "../../../Context/useRole";
import LoadingSpinner from "../../../Api/LoadingSpinner";

const CharityDashboard = () => {
  const [role, setRole] = useRole()
  if (role !== "Charity") {
    return <div className="p-5 text-center">You do not have access to this dashboard.</div>;
  }
  if(setRole) return <div className="p-5 text-center"><LoadingSpinner/></div>;
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-60  p-6 flex flex-col justify-between">
        <div>
          <h2 className="font-bold text-lg mb-6 text-center">Charity Dashboard</h2>
          <nav className="flex flex-col gap-3">
            {/* <NavLink
              to="profile"
              className={({ isActive }) =>
                isActive ? "btn btn-info w-full" : "btn btn-outline w-full"
              }
            >
              Charity Profile
            </NavLink> */}
            <NavLink
              to="requests"
              className={({ isActive }) =>
                isActive ? "btn btn-info w-full" : "btn btn-outline w-full"
              }
            >
              My Requests
            </NavLink>
            <NavLink
              to="pickups"
              className={({ isActive }) =>
                isActive ? "btn btn-info w-full" : "btn btn-outline w-full"
              }
            >
              My Pickups
            </NavLink>
            <NavLink
              to="received"
              className={({ isActive }) =>
                isActive ? "btn btn-info w-full" : "btn btn-outline w-full"
              }
            >
              Received Donations
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

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default CharityDashboard;

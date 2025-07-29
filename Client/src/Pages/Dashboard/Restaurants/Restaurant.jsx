import React from "react";
import { NavLink, Outlet } from "react-router";
import useRole from "../../../Context/useRole";
import LoadingSpinner from "../../../Api/LoadingSpinner";

const RestaurantDashboard = () => {
  const [role, setRole] = useRole()
  if (role !== "Restaurant") {
    return <div className="p-5 text-center">You do not have access to this dashboard.</div>;
  }
  if(setRole) return <div className="p-5 text-center"><LoadingSpinner/></div>;
  return (
    <div className="min-h-screen flex flex-col  md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-60 bg-gray-100 p-6 flex flex-col justify-between">
        <div>
          <h2 className="font-bold text-lg mb-6 text-center">Restaurant Dashboard</h2>
          <nav className="flex flex-col gap-3">
            {/* <NavLink
              to="profile"
              className={({ isActive }) =>
                isActive ? "btn btn-info w-full" : "btn btn-outline w-full"
              }
            >
              Restaurant Profile
            </NavLink> */}
            <NavLink
              to="add-donation"
              className={({ isActive }) =>
                isActive ? "btn btn-info w-full" : "btn btn-outline w-full"
              }
            >
              Add Donation
            </NavLink>
            <NavLink
              to="my-donations"
              className={({ isActive }) =>
                isActive ? "btn btn-info w-full" : "btn btn-outline w-full"
              }
            >
              My Donations
            </NavLink>
            <NavLink
              to="requests"
              className={({ isActive }) =>
                isActive ? "btn btn-info w-full" : "btn btn-outline w-full"
              }
            >
              Requested Donations
            </NavLink>
            <NavLink
              to="donation-charts"
              className={({ isActive }) =>
                isActive ? "btn btn-info w-full" : "btn btn-outline w-full"
              }
            >
              Donations Chart
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

export default RestaurantDashboard;

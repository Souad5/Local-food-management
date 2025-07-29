import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import useRole from "../../Context/useRole";
import LoadingSpinner from "../../Api/LoadingSpinner";

const DashBoard = () => {
const [role, isRoleLoading] = useRole();
if(isRoleLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-60 bg-gray-100 p-6 flex flex-col justify-between">
        <div>
          <NavLink to="/" className="font-bold text-lg btn btn-info w-full mb-6 text-center">
            Local Food
          </NavLink>
          <nav className="flex flex-col gap-3">
            {role === 'User' && <NavLink to="users" className={({ isActive }) => isActive ? "btn btn-info w-full" : "btn btn-outline w-full" }>
              Users
            </NavLink>}
          {role === 'Restaurant' && <NavLink to="restaurants" className={({ isActive }) => isActive ? "btn btn-info w-full" : "btn btn-outline w-full" }>
            Restaurants
          </NavLink>}
            {role === 'Charity' && <NavLink to="charity" className={({ isActive }) => isActive ? "btn btn-info w-full" : "btn btn-outline w-full"}>
              Charity
            </NavLink>}
            {role === 'Admin' &&<NavLink to="admin" className={({ isActive }) => isActive ? "btn btn-info w-full" : "btn btn-outline w-full" }>
              Admin
            </NavLink>}
          </nav>
        </div>

        <div className="flex flex-col gap-3 mt-10">
          <Link to="profile"><button className="btn btn-info w-full">Profile</button></Link>
          <Link to="/"><button className="btn btn-error w-full">Logout</button></Link>
        </div>
      </aside>
        
      {/* Main Content */}
      <main className="flex-1 p-4 overflow-auto">
        <Outlet />
        <h1 className="text-2xl font-bold mb-4 text-center">Welcome to Dashboard</h1>
      </main>
    </div>
  );
};

export default DashBoard;

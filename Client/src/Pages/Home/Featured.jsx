import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import axios from "axios";

const Home = () => {
  const { data: featured = [] } = useQuery({
    queryKey: ["featuredDonations"],
    queryFn: async () => {
      const res = await axios.get("https://assignment-12-xi-neon.vercel.app/featured-donations");
      return res.data;
    },
  });

  const { data: latestRequests = [] } = useQuery({
    queryKey: ["latestRequests"],
    queryFn: async () => {
      const res = await axios.get("https://assignment-12-xi-neon.vercel.app/requests/latest");
      return res.data;
    },
  });

  return (
    <div className="p-5 max-w-6xl mx-auto space-y-12">

      {/* Featured Donations */}
      <div>
        <h2 className="text-2xl font-bold mb-4">🍽️ Featured Donations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((item) => (
            <div key={item._id} className="card bg-white p-4 rounded-lg shadow">
              <img src={item.image} alt={item.title} className="h-40 w-full object-cover rounded" />
              <div className="mt-3 space-y-1">
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p>🍞 {item.foodType}</p>
                <p>🏪 {item.restaurantName}</p>
                <p>📍 {item.location}</p>
                <p>Status: <span className="badge badge-info">{item.status}</span></p>
                <Link to={`/donations/${item._id}`} className="btn btn-sm btn-primary mt-2">
                  Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Latest Charity Requests */}
      <div>
        <h2 className="text-2xl font-bold mb-4">🎗 Latest Charity Requests</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestRequests.map((req) => (
            <div key={req._id} className="card bg-white p-4 rounded-lg shadow">
              <div className="flex items-center gap-3">
                <img src={req.charityImage} className="w-12 h-12 rounded-full object-cover" alt="Charity" />
                <div>
                  <h3 className="font-semibold">{req.charityName}</h3>
                  <p className="text-sm text-gray-500">📛 {req.donationTitle}</p>
                </div>
              </div>
              <p className="mt-3 text-sm">{req.description}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Home;

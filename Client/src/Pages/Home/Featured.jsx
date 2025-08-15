import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import axios from "axios";

const Home = () => {
  const { data: featured = [] } = useQuery({
    queryKey: ["featuredDonations"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/featured-donations");
      return res.data;
    },
  });

  const { data: latestRequests = [] } = useQuery({
    queryKey: ["latestRequests"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/requests/latest");
      return res.data;
    },
  });

  return (
    <div className="lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 py-10">
      
      {/* Featured Donations */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
          🍽️ Featured Donations
        </h2>
        <div className="grid  lg:grid-cols-3 gap-8">
          {featured.map((item) => (
            <div
              key={item._id}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-48 w-full object-cover"
              />
              <div className="flex flex-col flex-grow p-5 space-y-2">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">🍞 {item.foodType}</p>
                <p className="text-gray-600 dark:text-gray-400">🏪 {item.restaurantName}</p>
                <p className="text-gray-600 dark:text-gray-400">📍 {item.location}</p>
                <p className="text-sm">
                  Status:{" "}
                  <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                    {item.status}
                  </span>
                </p>
                <div className="pt-3 mt-auto">
                  <Link
                    to={`/donations/${item._id}`}
                    className="block text-center  py-2 rounded-lg  transition-colors"
                  >
                     <a
                    href="#_"
                    class="relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter  bg-gray-800 rounded-lg group"
                  >
                    <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-green-500 rounded-full group-hover:w-56 group-hover:h-56"></span>
                    <span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
                    <span class="relative">View Details</span>
                  </a>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Charity Requests */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
          🎗 Latest Charity Requests
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestRequests.map((req) => (
            <div
              key={req._id}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-5 flex flex-col"
            >
              <div className="flex items-center gap-4">
                <img
                  src={req.charityImage}
                  className="w-14 h-14 rounded-full object-cover border-2 border-primary"
                  alt={req.charityName}
                />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                    {req.charityName}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    📛 {req.donationTitle}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {req.description}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;

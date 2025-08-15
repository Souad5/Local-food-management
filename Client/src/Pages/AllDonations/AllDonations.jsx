import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { PulseLoader } from "react-spinners";

const AllDonations = () => {
  const [donations, setDonations] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDonations = async () => {
      setLoading(true);
      try {
        const queryParams = {};
        if (search) queryParams.location = search;
        if (sort) queryParams.sortBy = sort;

        const res = await axios.get(
          "http://localhost:5000/donations",
          { params: queryParams }
        );

        setDonations(res.data);
      } catch (error) {
        console.error("Failed to fetch donations", error);
        setDonations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, [search, sort]);

  return (
    <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      {/* Search & Sort */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
        <input
          type="text"
          placeholder="Search by location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-lime-400"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full md:w-1/4 px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-lime-400"
        >
          <option value="">Sort by</option>
          <option value="quantity">Quantity (High to Low)</option>
          <option value="pickupTime">Pickup Time (Earliest)</option>
        </select>
      </div>

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[60vh]">
          <PulseLoader color="#84cc16" />
        </div>
      ) : donations.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No donations found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {donations.map((donation) => (
            <div
              key={donation._id}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg flex flex-col justify-between overflow-hidden hover:shadow-2xl transition duration-300"
            >
              <img
                src={donation.image || "/default-donation.jpg"}
                alt={donation.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex flex-col gap-2 flex-1">
                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 truncate">
                  {donation.title}
                </h2>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  🍽 <strong>Restaurant:</strong> {donation.restaurantName} -{" "}
                  {donation.location}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  🎗 <strong>Charity:</strong>{" "}
                  {donation.charityName || "Not assigned"}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  📦 <strong>Status:</strong> {donation.status}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  ⚖ <strong>Quantity:</strong> {donation.quantity}
                </p>
                <Link
                  to={`/all-donation/${donation._id}`}
                  className="mt-3 inline-block text-center  text-white py-2 rounded-lg font-semibold transition"
                >
                  <a
                    href="#_"
                    class="relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group"
                  >
                    <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-green-500 rounded-full group-hover:w-56 group-hover:h-56"></span>
                    <span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
                    <span class="relative">View Details</span>
                  </a>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllDonations;

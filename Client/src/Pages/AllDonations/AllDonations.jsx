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

        const res = await axios.get("https://assignment-12-xi-neon.vercel.app/donations", {
          params: queryParams,
        });

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
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full md:w-1/3"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="select select-bordered w-full md:w-1/4"
        >
          <option value="">Sort by</option>
          <option value="quantity">Quantity (High to Low)</option>
          <option value="pickupTime">Pickup Time (Earliest)</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center text-gray-500 min-h-screen"><PulseLoader color="green"/></div>
      ) : donations.length === 0 ? (
        <p className="text-gray-500 text-center">No donations found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {donations.map((donation) => (
            <div
              key={donation._id}
              className="card shadow-md border rounded-xl p-4 space-y-2"
            >
              <img
                src={donation.image || "/default-donation.jpg"}
                alt={donation.title}
                className="w-full h-40 object-cover rounded"
              />
              <h2 className="text-xl font-bold">{donation.title}</h2>
              <p>
                <strong>Restaurant:</strong> {donation.restaurantName} -{" "}
                {donation.location}
              </p>
              <p>
                <strong>Charity:</strong>{" "}
                {donation.charityName || "Not assigned"}
              </p>
              <p>
                <strong>Status:</strong> {donation.status}
              </p>
              <p>
                <strong>Quantity:</strong> {donation.quantity}
              </p>
              <Link
                to={`/all-donation/${donation._id}`}
                className="btn btn-sm btn-primary mt-2"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllDonations;

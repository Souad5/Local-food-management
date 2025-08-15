import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import axios from "axios";
import LoadingSpinner from "../../../Api/LoadingSpinner";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const Overview = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchStats = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:5000/api/dashboard/stats?userEmail=${user.email}`
        );
        if (res.data.success) {
          setStats(res.data.stats);
        }
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user?.email]);

  if (loading || !stats) return <LoadingSpinner />;

  const chartData = [
    { name: "Favorites", value: stats.totalFavorites },
    { name: "Reviews", value: stats.totalReviews },
    { name: "Charity Request", value: stats.hasCharityRequest ? 1 : 0 },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Dashboard Overview</h1>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 rounded-xl shadow p-4 text-center">
          <h2 className="text-lg font-semibold">Favorites</h2>
          <p className="text-3xl font-bold">{stats.totalFavorites}</p>
        </div>
        <div className="bg-gray-800 rounded-xl shadow p-4 text-center">
          <h2 className="text-lg font-semibold">Reviews</h2>
          <p className="text-3xl font-bold">{stats.totalReviews}</p>
        </div>
        <div className="bg-gray-800 rounded-xl shadow p-4 text-center">
          <h2 className="text-lg font-semibold">Charity Requests</h2>
          <p className="text-3xl font-bold">
            {stats.hasCharityRequest ? "Yes" : "No"}
          </p>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold mb-4 text-center">Stats Pie Chart</h2>
        <PieChart width={400} height={300}>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default Overview;

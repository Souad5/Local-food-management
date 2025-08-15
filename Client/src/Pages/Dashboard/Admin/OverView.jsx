// src/Pages/Dashboard/Admin/AdminOverview.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, ComposedChart, Line, PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import LoadingSpinner from "../../../Api/LoadingSpinner";

const AdminOverview = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/dashboard/stats");
        if (res.data.success) {
          setStats(res.data.stats);
        } else {
          setError("Failed to load stats");
        }
      } catch (err) {
        setError("Failed to load stats");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div className="text-center mt-10"><LoadingSpinner/></div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  const chartData = [
    { name: "Donations", value: stats.totalDonations },
    { name: "Users", value: stats.totalUsers },
    { name: "Role Requests", value: stats.totalRoleRequests },
    { name: "Featured Donations", value: stats.totalFeaturedDonations },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* AreaChart */}
        <div className=" shadow rounded p-4">
          <h2 className="font-semibold mb-2">Area Chart</h2>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1} fill="url(#colorValue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* BarChart */}
        <div className=" shadow rounded p-4">
          <h2 className="font-semibold mb-2">Bar Chart</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData} >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* ComposedChart */}
        <div className=" shadow rounded p-4">
          <h2 className="font-semibold mb-2">Composed Chart</h2>
          <ResponsiveContainer width="100%" height={250}>
            <ComposedChart data={chartData}>
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" barSize={20} fill="#413ea0" />
              <Line type="monotone" dataKey="value" stroke="#ff7300" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* PieChart */}
        <div className=" shadow rounded p-4">
          <h2 className="font-semibold mb-2">Pie Chart</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;

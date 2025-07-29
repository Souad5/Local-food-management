import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const ReChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/donations/all`);
        const donations = res.data;

        const typeMap = {};

        donations.forEach(donation => {
          const type = donation.type || 'Unknown';
          const quantity = parseInt(donation.quantity) || 0;

          if (typeMap[type]) {
            typeMap[type] += quantity;
          } else {
            typeMap[type] = quantity;
          }
        });

        const formattedData = Object.entries(typeMap).map(([type, quantity]) => ({
          name: type,
          quantity
        }));

        setData(formattedData);
      } catch (error) {
        console.error('Error fetching donation data:', error);
      }
    };

    fetchDonations();
  }, []);

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="quantity" stroke="#82ca9d" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ReChart;

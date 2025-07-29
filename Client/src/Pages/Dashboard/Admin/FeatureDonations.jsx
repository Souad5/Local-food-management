import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { CheckCircle } from "lucide-react";

const FeatureDonations = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const fetchVerifiedDonations = async () => {
      try {
        const res = await axios.get("https://assignment-12-xi-neon.vercel.app/verified-donations");
        setDonations(res.data);
      } catch (error) {
        console.error("Error fetching donations:", error);
      }
    };
    fetchVerifiedDonations();
  }, []);

  const handleFeature = async (donation) => {
    try {
      await axios.post("https://assignment-12-xi-neon.vercel.app/featured-donations", donation);
      toast.success("Donation featured successfully!");
      setDonations((prev) =>
        prev.map((d) =>
          d._id === donation._id ? { ...d, isFeatured: true } : d
        )
        
      );
    } catch (err) {
      toast.error("Already Added.");
      console.error("Feature error:", err);
    }
  };
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Feature Donations</h2>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Type</th>
            <th>Restaurant</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {donations.map((d) => (
            <tr key={d._id}>
              <td>
                <img
                  src={d.image}
                  alt={d.title}
                  className="w-16 h-16 object-cover"
                />
              </td>
              <td>{d.title}</td>
              <td>{d.foodType}</td>
              <td>{d.restaurantName}</td>
              <td>
                {d.isFeatured ? (
                  <CheckCircle className="text-green-500 w-6 h-6" />
                ) : (
                  <button
                    onClick={() => handleFeature(d)}
                    className="btn btn-primary btn-sm"
                  >
                    Feature
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeatureDonations;

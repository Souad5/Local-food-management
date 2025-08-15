import { useEffect, useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../../../Context/AuthContext";
import LoadingSpinner from "../../../Api/LoadingSpinner";

const MyPickups = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/requests?charityEmail=${encodeURIComponent(user.email)}`,
        { withCredentials: true }
      );
      // Filter only "Accepted" requests
      const acceptedRequests = (res.data || []).filter(req => req.status === "Accepted");
      setRequests(acceptedRequests);
    } catch (err) {
      toast.error("Failed to load pickups");
      console.error(err);
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmPickup = async (id) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/requests/${id}`,
        { status: "Picked Up" },
        { withCredentials: true }
      );
      toast.success("Pickup confirmed");
      fetchRequests();
    } catch (err) {
      toast.error("Failed to confirm pickup");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [user?.email]);

  if (loading) return <div className="flex justify-center items-center min-h-[200px]"><LoadingSpinner /></div>;

  if (requests.length === 0) return <div className="text-center text-gray-500">No pickups assigned yet.</div>;

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h2 className="text-2xl font-bold mb-4">My Pickups</h2>
      <div className="grid gap-4">
        {requests.map((req) => (
          <div key={req._id} className="border rounded p-4 shadow ">
            <h3 className="text-xl font-semibold mb-1">{req.donationTitle}</h3>
            <p><strong>Restaurant:</strong> {req.restaurantName || "N/A"}</p>
            <p><strong>Food Type:</strong> {req.foodType || "N/A"}</p>
            <p><strong>Quantity:</strong> {req.quantity || "N/A"}</p>
            <p><strong>Pickup Time:</strong> {new Date(req.pickupTime).toLocaleString()}</p>
            <p>
              <strong>Status:</strong>{" "}
              <span className={`badge ${req.status === "Accepted" ? "badge-success" : "badge-info"}`}>
                {req.status}
              </span>
            </p>
            <button
              onClick={() => handleConfirmPickup(req._id)}
              className="btn btn-sm btn-primary mt-2"
            >
              Confirm Pickup
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPickups;

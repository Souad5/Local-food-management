import { useEffect, useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../../../Context/AuthContext";
import LoadingSpinner from "../../../Api/LoadingSpinner";

const MyRequests = () => {
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
      setRequests(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      toast.error("Failed to load requests");
      console.error(err);
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this request?")) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/requests/${id}`,
        { withCredentials: true }
      );
      toast.success("Request canceled");
      fetchRequests();
    } catch (err) {
      toast.error(err?.response?.data?.error || "Failed to cancel request");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.email]);

  if (loading) return <div className="flex justify-center items-center min-h-[200px]"><LoadingSpinner /></div>;

  if (requests.length === 0) return <div className="text-center text-gray-500">No donation requests made yet.</div>;

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h2 className="text-2xl font-bold mb-4">My Donation Requests</h2>
      <div className="grid gap-4">
        {requests.map((req) => (
          <div key={req._id} className="border rounded p-4 shadow bg-white">
            <h3 className="text-xl font-semibold mb-1">{req.donationTitle}</h3>
            <p><strong>Restaurant:</strong> {req.restaurantName}</p>
            <p><strong>Food Type:</strong> {req.foodType || "N/A"}</p>
            <p><strong>Quantity:</strong> {req.quantity || "N/A"}</p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`badge ${
                  req.status === "Pending"
                    ? "badge-warning"
                    : req.status === "Accepted"
                    ? "badge-success"
                    : "badge-error"
                }`}
              >
                {req.status}
              </span>
            </p>
            {req.status === "Pending" && (
              <button
                onClick={() => handleCancel(req._id)}
                className="btn btn-sm btn-error mt-2"
              >
                Cancel Request
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyRequests;

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ManageRoleRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL || ""}/api/charity-role/all`,
        { withCredentials: true }
      );
      const data = res.data;
      if (Array.isArray(data)) {
        setRequests(data);
      } else if (Array.isArray(data.requests)) {
        setRequests(data.requests);
      } else {
        console.error("Unexpected response:", data);
        toast.error("Invalid data format from server");
        setRequests([]);
      }
    } catch (err) {
      console.error("Failed to load requests", err);
      toast.error("Failed to load requests");
      setRequests([]);
    }
  };

  const updateStatus = async (id, email, newStatus) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL || ""}/api/charity-role/update/${id}`,
        { status: newStatus, email },
        { withCredentials: true }
      );
      toast.success(`Request ${newStatus}`);
      fetchRequests(); // Refresh list
    } catch (err) {
      console.error(`Failed to ${newStatus}`, err);
      toast.error(`Failed to ${newStatus}`);
    }
  };

  return (
    <div className="p-5 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Charity Role Requests</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Organization</th>
              <th>Mission</th>
              <th>Transaction ID</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id}>
                <td>{req.name}</td>
                <td>{req.email}</td>
                <td>{req.orgName}</td>
                <td>{req.mission}</td>
                <td>{req.transactionId}</td>
                <td>{req.status}</td>
                <td className="space-x-2">
                  {req.status === "Pending" ? (
                    <>
                      <button
                        onClick={() => updateStatus(req._id, req.email, "Approved")}
                        className="btn btn-success btn-sm"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateStatus(req._id, req.email, "Rejected")}
                        className="btn btn-error btn-sm"
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span className="text-gray-500">Action taken</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageRoleRequests;

import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../Context/AuthContext";
import { TiTick } from "react-icons/ti";
import { MdDangerous } from "react-icons/md";

const RequestedDonations = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(
          `http://localhost:5000/api/restaurant/requests?restaurantEmail=${user.email}`
        )
        .then((res) => setRequests(res.data))
        .catch((err) => {
          console.error(
            "Error fetching requests:",
            err.response?.data || err.message
          );
        });
    }
  }, [user]);
  

  const handleAccept = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/requests/accept/${id}`);

      setRequests((prev) =>
        prev.map((req) =>
          req._id === id ? { ...req, status: "Accepted" } : req
        )
      );
    } catch (err) {
      console.error("Error accepting request:", err);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/requests/reject/${id}`);
      setRequests((prev) =>
        prev.map((req) =>
          req._id === id ? { ...req, status: "Rejected" } : req
        )
      );
    } catch (err) {
      console.error("Error rejecting request:", err);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Donation Title</th>
            <th>Food Type</th>
            <th>Charity Name</th>
            <th>Email</th>
            <th>Description</th>
            <th>Pickup Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req._id}>
              <td>{req.donationTitle}</td>
              <td>{req.foodType}</td>
              <td>{req.charityName}</td>
              <td>{req.charityEmail}</td>
              <td>{req.description}</td>
              <td>{req.pickupTime}</td>
              <td>{req.status}</td>
              <td>
                {req.status === "Pending" ? (
                  <>
                    <button
                      className="btn btn-success btn-sm mr-1"
                      onClick={() => handleAccept(req._id)}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-error btn-sm"
                      onClick={() => handleReject(req._id)}
                    >
                      Reject
                    </button>
                  </>
                ) : req.status === "Accepted" ? (
                  <span className="text-gray-400">
                    <TiTick color="green" size="20px" />
                  </span>
                ) : (
                  <span className="text-red-500">
                    <MdDangerous size="20px" />
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestedDonations;

// src/pages/ManageRequests.jsx
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../Context/AuthContext";

const ManageRequests = () => {
  const [requests, setRequests] = useState([]);
  const { user } = useContext(AuthContext);

useEffect(() => {
  if (user?.email) {
    axios.get(`http://localhost:5000/api/requests?charityEmail=${user.email}`)
      .then(res => setRequests(res.data))
      .catch(err => console.error(err));
  }
}, [user]);

  const handleDelete = async (id) => {
    

    try {
      await axios.delete(`http://localhost:5000/api/requests/${id}`);
      setRequests(prev => prev.filter(req => req._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Manage Requests</h2>
      <div className="overflow-x-auto">
        <table className="table w-full table-zebra">
          <thead>
            <tr>
              <th>Donation Title</th>
              <th>Charity Name</th>
              <th>Email</th>
              <th>Description</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id}>
                <td>{req.donationTitle}</td>
                <td>{req.charityName}</td>
                <td>{req.charityEmail}</td>
                <td>{req.description}</td>
                <td>
                  <button
                    onClick={() => handleDelete(req._id)}
                    className="btn btn-sm bg-red-500 text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr><td colSpan="5" className="text-center text-gray-500">No requests found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageRequests;

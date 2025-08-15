import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { CircleCheck, CircleAlert } from "lucide-react"; // Import icons

const ManageDonations = () => {
  const [donations, setDonations] = useState([]);

  const fetchDonations = () => {
    fetch("http://localhost:5000/donations/all")
      .then((res) => res.json())
      .then((data) => setDonations(data));
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const updateDonationStatus = (id, status) => {
    fetch(`http://localhost:5000/donations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire("Success", `Donation ${status}`, "success");
          fetchDonations();
        }
      });
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manage All Donations</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Food Type</th>
              <th>Restaurant Name</th>
              <th>Restaurant Email</th>
              <th>Quantity</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => (
              <tr key={donation._id}>
                <td>{donation.title}</td>
                <td>{donation.foodType}</td>
                <td>{donation.restaurantName}</td>
                <td>{donation.restaurantEmail}</td>
                <td>{donation.quantity}</td>
                <td>{donation.status}</td>
                <td className="flex gap-2 justify-center items-center">
                  {donation.status === "Pending" && (
                    <>
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() =>
                          updateDonationStatus(donation._id, "Verified")
                        }
                      >
                        Verify
                      </button>
                      <button
                        className="btn btn-sm btn-error"
                        onClick={() =>
                          updateDonationStatus(donation._id, "Rejected")
                        }
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {donation.status === "Verified" && (
                    <CircleCheck className="text-green-600" />
                  )}
                  {donation.status === "Rejected" && (
                    <CircleAlert className="text-red-600" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {donations.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No donations found.</p>
        )}
      </div>
    </div>
  );
};

export default ManageDonations;

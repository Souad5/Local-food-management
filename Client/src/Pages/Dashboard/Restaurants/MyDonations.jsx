import React, { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../../../Context/AuthContext";

const MyDonations = () => {
  const { user } = useContext(AuthContext);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [formData, setFormData] = useState({});

  const { data: donations = [], refetch } = useQuery({
    queryKey: ["myDonations", user?.email],
    queryFn: async () => {
      const res = await axios.get(`https://assignment-12-xi-neon.vercel.app/donations/res?email=${user.email}`

      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleDelete = async (id) => {
  const confirm = window.confirm("Are you sure you want to delete this donation?");
  if (!confirm) return;
  await axios.delete(`https://assignment-12-xi-neon.vercel.app/donations/${id}`);
  refetch();
};


  const openUpdateModal = (donation) => {
    setSelectedDonation(donation);
    setFormData(donation);
    document.getElementById("update_modal").showModal();
  };

  

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    await axios.patch(
      `https://assignment-12-xi-neon.vercel.app/donations/${selectedDonation._id}`,
      formData
    );
    document.getElementById("update_modal").close();
    refetch();
  };

  return (
    <div className="p-5 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-5">My Donations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {donations.map((d) => (
          <div key={d._id} className="border p-4 rounded ">
            <img src={d.image} alt={d.title} className="h-40 w-full object-cover rounded" />
            <h3 className="font-bold text-lg mt-2">{d.title}</h3>
            <p>Type: {d.type}</p>
            <p>Quantity: {d.quantity}</p>
            <p>
              Status: <span className="badge badge-info">{d.status}</span>
            </p>
            {d.status !== "Rejected" && (
              <button
                onClick={() => openUpdateModal(d)}
                className="btn btn-sm btn-warning mt-2"
              >
                Update
              </button>
            )}
            <button
              onClick={() => handleDelete(d._id)}
              className="btn btn-sm btn-error mt-2 ml-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      <dialog id="update_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Update Donation</h3>
          <form onSubmit={handleUpdateSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Title"
              value={formData.title || ""}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="input input-bordered w-full"
              required
            />
            <input
              type="text"
              placeholder="Type"
              value={formData.type || ""}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
              className="input input-bordered w-full"
              required
            />
            <input
              type="number"
              placeholder="Quantity"
              value={formData.quantity || ""}
              onChange={(e) =>
                setFormData({ ...formData, quantity: e.target.value })
              }
              className="input input-bordered w-full"
              required
            />
            <input
              type="text"
              placeholder="Image URL"
              value={formData.image || ""}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
              className="input input-bordered w-full"
              required
            />
            <div className="modal-action">
              <button type="submit" className="btn btn-success">
                Update
              </button>
              <button
                type="button"
                onClick={() => document.getElementById("update_modal").close()}
                className="btn"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default MyDonations;

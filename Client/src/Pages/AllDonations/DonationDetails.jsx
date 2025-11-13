import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import LoadingSpinner from "../../Api/LoadingSpinner";
import useRole from "../../Context/useRole";

const DonationDetails = () => {
  const { id } = useParams();
  const [role, isRoleLoading] = useRole();
  const { user } = useContext(AuthContext);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const { data: donation = {}, refetch } = useQuery({
    queryKey: ["donation", id],
    queryFn: async () => {
      const res = await axios.get(`https://assignment-12-xi-neon.vercel.app/donations/${id}`);
      return res.data;
    },
  });

  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const res = await axios.get(`https://assignment-12-xi-neon.vercel.app/api/reviews/${id}`);
      return res.data;
    },
  });

  const handleFavorite = async () => {
    const token = localStorage.getItem("access-token");
    if (!token) return toast.error("Please login first");

    const favoriteData = {
      donationId: donation._id,
      image: donation.image,
      title: donation.title,
      restaurantName: donation.restaurantName,
      location: donation.location,
      status: donation.status,
      quantity: donation.quantity,
    };

    try {
      const res = await axios.post(
        "https://assignment-12-xi-neon.vercel.app/api/favorites",
        favoriteData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) toast.success("Added to favorites!");
    } catch (err) {
      toast.error("Failed to favorite");
      console.error("Error favoriting donation:", err);
    }
  };
  if (isRoleLoading)
    return (
      <div className="text-center mt-10 text-xl">
        <LoadingSpinner />
      </div>
    );

  const handleConfirmPickup = async () => {
    try {
      await axios.patch(`https://assignment-12-xi-neon.vercel.app/donations/${id}`, {
        status: "Picked Up",
      });
      Swal.fire("Confirmed", "Pickup marked as complete", "success");
      refetch();
    } catch (err) {
      toast.error("Failed to confirm pickup");
      console.error("Error confirming pickup:", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-20">
      <img
        src={donation.image}
        alt={donation.title}
        className="w-full h-72 object-cover rounded-lg mb-4"
      />
      <h2 className="text-3xl font-bold mb-2">{donation.title}</h2>
      <p>
        <strong>Restaurant:</strong> {donation.restaurantName}
      </p>
      <p>
        <strong>Location:</strong> {donation.location}
      </p>
      <p>
        <strong>Quantity:</strong> {donation.quantity}
      </p>
      <p>
        <strong>Pickup Time:</strong> {donation.pickupTime}
      </p>
      <p>
        <strong>Status:</strong>{" "}
        <span className="badge badge-info">{donation.status}</span>
      </p>

      <div className="mt-5 flex gap-3 flex-wrap">
        <button onClick={handleFavorite} className="relative cursor-pointer inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter  rounded-lg group">
          <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-blue-500 rounded-full group-hover:w-96 group-hover:h-56"></span>
          <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
          <span className="relative ">❤️ Save to Favorites</span>
        </button>
        
        {role === "Charity" && (
          <>
            <button
              className="btn btn-primary"
              onClick={() => setShowRequestModal(true)}
            >
              Request Donation
            </button>
            {donation.status === "Accepted" && (
              <button onClick={handleConfirmPickup}  className="relative cursor-pointer inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter  rounded-lg group">
          <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-blue-500 rounded-full group-hover:w-96 group-hover:h-56"></span>
          <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
          <span className="relative ">✅ Confirm Pickup</span>
        </button>
            )}
          </>
        )}
        <button onClick={() => setShowReviewModal(true)} className="relative inline-flex cursor-pointer items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter  rounded-lg group">
          <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-blue-500 rounded-full group-hover:w-96 group-hover:h-56"></span>
          <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
          <span className="relative ">⭐ Add Review</span>
        </button>
        
      </div>

      {/* ⭐ Review Section */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-3">Reviews</h3>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map((r, i) => (
            <div key={i} className="border p-4 rounded-lg mb-2">
              <p>
                <strong>{r.reviewer}</strong> — {r.rating}⭐
              </p>
              <p>{r.reviewText}</p>
            </div>
          ))
        )}
      </div>

      {/* 🔽 Request Modal */}
      {showRequestModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Request Donation</h3>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const data = {
                  donationId: id,
                  donationTitle: donation.title,
                  restaurantName: donation.restaurantName,
                  charityName: user.displayName,
                  charityEmail: user.email,
                  description: e.target.description.value,
                  pickupTime: e.target.pickupTime.value,
                  status: "Pending",
                };
                await axios.post("https://assignment-12-xi-neon.vercel.app/api/requests", data);
                Swal.fire(
                  "Request Sent",
                  "Awaiting restaurant response",
                  "success"
                );
                setShowRequestModal(false);
              }}
            >
              <input
                className="input input-bordered w-full my-2"
                readOnly
                value={donation.title}
              />
              <input
                className="input input-bordered w-full my-2"
                readOnly
                value={donation.restaurantName}
              />
              <input
                className="input input-bordered w-full my-2"
                readOnly
                value={user.displayName}
              />
              <input
                className="input input-bordered w-full my-2"
                readOnly
                value={user.email}
              />
              <textarea
                name="description"
                className="textarea textarea-bordered w-full"
                placeholder="Request reason..."
                required
              />
              <input
                name="pickupTime"
                type="datetime-local"
                className="input input-bordered w-full my-2"
                required
              />
              <div className="modal-action">
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
                <button
                  onClick={() => setShowRequestModal(false)}
                  className="btn"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 🔽 Review Modal */}
      {showReviewModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Submit Review</h3>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const data = {
                  donationId: id,
                  donationTitle: donation.title,
                  userEmail: user.email,
                  reviewer: user.displayName,
                  reviewText: e.target.review.value,
                  rating: e.target.rating.value,
                  time: new Date(),
                };
                await axios.post("https://assignment-12-xi-neon.vercel.app/api/reviews", data);
                Swal.fire(
                  "Thanks!",
                  "Your review has been submitted",
                  "success"
                );
                setShowReviewModal(false);
              }}
            >
              <textarea
                name="review"
                className="textarea textarea-bordered w-full"
                placeholder="Your review..."
                required
              />
              <select
                name="rating"
                className="select select-bordered w-full mt-2"
                required
              >
                <option value="">Select rating</option>
                <option value="5">⭐⭐⭐⭐⭐</option>
                <option value="4">⭐⭐⭐⭐</option>
                <option value="3">⭐⭐⭐</option>
                <option value="2">⭐⭐</option>
                <option value="1">⭐</option>
              </select>
              <div className="modal-action">
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="btn"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationDetails;

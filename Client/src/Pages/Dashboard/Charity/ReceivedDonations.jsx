import { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../../../Context/AuthContext";
import { Dialog, DialogPanel, DialogTitle, Button } from "@headlessui/react";

const ReceivedDonations = () => {
  const { user } = useContext(AuthContext);
  const [donations, setDonations] = useState([]);
  const [selected, setSelected] = useState(null);
  const [review, setReview] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchDonations = async () => {
      if (!user?.email) {
        setDonations([]);
        return;
      }
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL || ""}/api/charity/received-donations?email=${encodeURIComponent(user.email)}`,
          { withCredentials: true }
        );
        const data = Array.isArray(res.data) ? res.data : [];
        setDonations(data);
      } catch (err) {
        console.error("Failed to load donations", err);
        toast.error("Failed to load donations");
        setDonations([]);
      }
    };
    fetchDonations();
  }, [user?.email]);

  const handleReviewSubmit = async () => {
    if (!review.trim()) return toast.error("Review is required");
    if (!selected || !user?.email) return toast.error("Missing data");

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL || ""}/api/reviews`,
        {
          requestId: selected._id,
          charityEmail: user.email,
          review,
          date: new Date(),
        },
        { withCredentials: true }
      );
      toast.success("Review submitted");
      setReview("");
      setSelected(null);
      setIsOpen(false); // ✅ Close modal
    } catch (err) {
      console.error("Failed to submit review", err);
      toast.error("Failed to submit review");
    }
  };

  if (!donations.length) {
    return (
      <div className="text-center text-gray-500 mt-10">
        No received donations yet.
      </div>
    );
  }

  return (
    <div className="p-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {donations.map((d) => (
        <div key={d._id} className="border p-4 rounded-xl shadow bg-white">
          <h2 className="font-bold text-lg">{d.donationTitle}</h2>
          <p><strong>Restaurant:</strong> {d.restaurantName || "N/A"}</p>
          <p><strong>Food Type:</strong> {d.foodType || "N/A"}</p>
          <p><strong>Quantity:</strong> {d.quantity || "N/A"}</p>
          <p><strong>Pickup Date:</strong> {new Date(d.pickupTime).toLocaleDateString()}</p>
          <button
            className="btn btn-primary mt-2"
            onClick={() => {
              setSelected(d);
              setIsOpen(true);
            }}
          >
            Review
          </button>
        </div>
      ))}

      {/* Unified Review Dialog */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed z-50 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4">
          <DialogPanel className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
            <DialogTitle className="text-lg font-semibold mb-2">
              Add Review
            </DialogTitle>
            <p className="mb-2"><strong>{selected?.donationTitle}</strong></p>
            <textarea
              className="w-full border p-2 rounded mb-3"
              rows="4"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your review here"
            />
            <div className="flex justify-end gap-2">
              <Button
                onClick={() => {
                  setSelected(null);
                  setIsOpen(false);
                }}
                className="bg-gray-500 text-white px-4 py-1 rounded btn"
              >
                Cancel
              </Button>
              <Button
                onClick={handleReviewSubmit}
                className="bg-green-600 text-white px-4 py-1 rounded btn"
              >
                Submit
              </Button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default ReceivedDonations;

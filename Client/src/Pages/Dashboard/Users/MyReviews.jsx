import React, { useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../../../Context/AuthContext";
import { toast } from "react-hot-toast";
import LoadingSpinner from "../../../Api/LoadingSpinner";

const MyReviews = () => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  // Fetch reviews
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["myReviews", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`https://assignment-12-xi-neon.vercel.app/api/reviews?userEmail=${user.email}`);
      return res.data;
    },
  });

  // Delete review
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return await axios.delete(`https://assignment-12-xi-neon.vercel.app/api/reviews/${id}`);
    },
    onSuccess: () => {
      toast.success("Review deleted!");
      queryClient.invalidateQueries(["myReviews", user?.email]);
    },
    onError: () => {
      toast.error("Failed to delete review.");
    },
  });

  if (isLoading || !user) return <div className="text-center mt-10"><LoadingSpinner/></div>;

  if (!reviews || reviews.length === 0) {
    return <p className="text-center mt-10">You haven't submitted any reviews yet.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-5 space-y-4">
      <h2 className="text-2xl font-semibold mb-4">My Reviews</h2>
      {reviews.map((review) => (
        <div key={review._id} className="p-4 border rounded bg-white shadow">
          <h3 className="font-bold text-lg">{review.donationTitle}</h3>
          <p className="text-sm text-gray-600">Restaurant: {review.restaurantName}</p>
          <p className="text-sm text-gray-600">
            Review Time: {new Date(review.time).toLocaleString()}
          </p>
          <p className="mt-2">{review.description}</p>
          <p>⭐ Rating: {review.rating}</p>
          <button
            className="btn btn-sm btn-error mt-2"
            onClick={() => deleteMutation.mutate(review._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default MyReviews;

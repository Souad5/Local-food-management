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
      const res = await axios.get(
        `https://assignment-12-xi-neon.vercel.app/api/reviews?userEmail=${user.email}`
      );
      return res.data;
    },
  });

  // Delete review
  const deleteMutation = useMutation({
    mutationFn: async (id) =>
      await axios.delete(
        `https://assignment-12-xi-neon.vercel.app/api/reviews/${id}`
      ),
    onSuccess: () => {
      toast.success("Review deleted!");
      queryClient.invalidateQueries(["myReviews", user?.email]);
    },
    onError: () => {
      toast.error("Failed to delete review.");
    },
  });

  if (isLoading || !user)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );

  if (!reviews || reviews.length === 0)
    return (
      <p className="text-center mt-20  text-lg">
        You haven't submitted any reviews yet.
      </p>
    );

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8 space-y-6">
      <h2 className="text-3xl font-bold mb-4 text-center">My Reviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="p-4  shadow rounded-xl flex flex-col justify-between transition-transform hover:scale-105 border"
          >
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">{review.donationTitle}</h3>
              <p className=" ">
                Restaurant: {review.restaurantName}
              </p>
              <p className="text-gray-500  text-sm">
                Review Time: {new Date(review.time).toLocaleString()}
              </p>
              <p className="mt-2">{review.description}</p>
              <p className="font-medium text-yellow-500">⭐ Rating: {review.rating}</p>
            </div>
            <button
              className="btn btn-sm btn-error mt-4 hover:bg-red-600"
              onClick={() => deleteMutation.mutate(review._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyReviews;

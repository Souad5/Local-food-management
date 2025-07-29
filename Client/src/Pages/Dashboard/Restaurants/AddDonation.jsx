import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../Context/AuthContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const AddDonation = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    type: "",
    quantity: "",
    pickupTime: "",
    location: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const imgbbApiKey = "6eb7097dd9ce154b26661bd7b4d3d0e4"; // Replace with your imgbb API key

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.email) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "User not authenticated. Please log in.",
      });
      return;
    }

    if (!imageFile) {
      toast.error("Please upload an image.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Upload image to imgbb
      const formData = new FormData();
      formData.append("image", imageFile);

      const imgbbRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
        formData
      );
      const imageUrl = imgbbRes.data.data.url;

      // Prepare donation data
      const donation = {
        title: form.title,
        foodType: form.type,
        quantity: form.quantity,
        pickupTime: form.pickupTime,
        location: form.location,
        image: imageUrl,
        restaurantName: user.name || "Unknown",
        restaurantEmail: user.email,
        status: "Pending",
        createdAt: new Date(),
      };
      // Save donation
      await axios.post("https://assignment-12-xi-neon.vercel.app/donations", donation);

      toast.success("Donation added successfully!");
      setForm({
        title: "",
        type: "",
        quantity: "",
        pickupTime: "",
        location: "",
      });
      setImageFile(null);
    } catch (error) {
      console.error(error);
      toast.error("Error adding donation.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <p>
        User not authenticated. Please{" "}
        <span
          onClick={() => navigate("/login")}
          className="text-blue-500 underline cursor-pointer"
        >
          log in
        </span>
        .
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 space-y-4">
      <input
        required
        type="text"
        placeholder="Donation Title (e.g., Surplus Pastries)"
        className="input input-bordered w-full"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <input
        required
        type="text"
        placeholder="Food Type (e.g., Bakery, Produce)"
        className="input input-bordered w-full"
        value={form.type}
        onChange={(e) => setForm({ ...form, type: e.target.value })}
      />

      <input
        required
        type="number"
        placeholder="Quantity (e.g., kg or portions)"
        className="input input-bordered w-full"
        value={form.quantity}
        onChange={(e) => setForm({ ...form, quantity: e.target.value })}
      />

      <input
        required
        type="text"
        placeholder="Pickup Time Window (e.g., 10 AM - 2 PM)"
        className="input input-bordered w-full"
        value={form.pickupTime}
        onChange={(e) => setForm({ ...form, pickupTime: e.target.value })}
      />

      {/* Readonly restaurant name */}
      <input
        type="text"
        className="input input-bordered w-full bg-gray-100"
        readOnly
        value={ user.displayName ||"Unknown Restaurant"}
        placeholder="Restaurant Name"
      />

      {/* Readonly restaurant email */}
      <input
        type="email"
        readOnly
        value={user.email}
        className="input input-bordered w-full bg-gray-100"
        placeholder="Restaurant Email"
      />

      <input
        required
        type="text"
        placeholder="Location (e.g., Address or Coordinates)"
        className="input input-bordered w-full"
        value={form.location}
        onChange={(e) => setForm({ ...form, location: e.target.value })}
      />

      <input
        required
        type="file"
        accept="image/*"
        className="file-input file-input-bordered w-full"
        onChange={(e) => setImageFile(e.target.files[0])}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn btn-primary w-full"
      >
        {isSubmitting ? "Adding Donation..." : "Add Donation"}
      </button>
    </form>
  );
};

export default AddDonation;

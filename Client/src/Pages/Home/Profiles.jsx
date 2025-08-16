import { useState } from "react";
import LoadingSpinner from "../../Api/LoadingSpinner";
import useRole from "../../Context/useRole";
import useAuth from "../UseAuth";

const Profiles = () => {
  const { user } = useAuth();
  const [role, isRoleLoading] = useRole();  // Call before any return
  const [formData, setFormData] = useState({
    displayName: user?.displayName || "",
    email: user?.email || "",
    phone: "",
    address: "",
    photoURL: user?.photoURL || "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Conditional loading after hooks
  if (!user || isRoleLoading) {
    return <LoadingSpinner />;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsEditing(false);
      alert("Profile updated successfully!");
    }, 1000);
  };

  return (
    <div className="flex justify-center items-start py-16 mt-20 min-h-screen">
      <div className=" shadow-lg rounded-2xl md:w-4/5 lg:w-3/5 p-6">
        {/* Profile Header */}
        <div className="flex flex-col items-center -mt-16">
          <div className="relative w-28 h-28">
            <img
              src={user.photoURL}
              alt="Profile"
              className="object-cover rounded-full w-full h-full border-4 border-white"
            />
          </div>

          <p className="mt-2 px-4 py-1 text-xs text-white bg-lime-500 rounded-full">
            {role?.toUpperCase()}
          </p>
        </div>

        {/* Form */}
        <div className="mt-8 space-y-4">
          {/* Name */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <label className="font-semibold w-32">Name:</label>
            <input
              type="text"
              name="displayName"
              value={user.displayName}
              onChange={handleChange}
              disabled={!isEditing}
              className="input input-bordered w-full md:w-2/3"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <label className="font-semibold w-32">Email:</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              disabled={!isEditing}
              className="input input-bordered w-full md:w-2/3"
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <label className="font-semibold w-32">Phone:</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Enter phone number"
              className="input input-bordered w-full md:w-2/3"
            />
          </div>

          {/* Address */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <label className="font-semibold w-32">Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Enter address"
              className="input input-bordered w-full md:w-2/3"
            />
          </div>

          {/* Profile Picture */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <label className="font-semibold w-32">Profile Picture URL:</label>
            <input
              type="text"
              name="photoURL"
              value={user.photoURL}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Paste image URL"
              className="input input-bordered w-full md:w-2/3"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 mt-4">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="btn btn-primary"
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profiles;

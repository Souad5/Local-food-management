import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  // Fetch all users on component mount
  const fetchUsers = () => {
    fetch("https://assignment-12-xi-neon.vercel.app/users")  // Adjust API endpoint if needed
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch(() => Swal.fire("Error", "Failed to load users", "error"));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Update user role
  const updateUserRole = (id, role) => {
    fetch(`https://assignment-12-xi-neon.vercel.app/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update role");
        return res.json();
      })
      .then(() => {
        Swal.fire("Success", `User role updated to ${role}`, "success");
        fetchUsers();
      })
      .catch(() => Swal.fire("Error", "Could not update role", "error"));
  };

  // Delete user
  const deleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "User will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete user",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://assignment-12-xi-neon.vercel.app/users/${id}`, {
          method: "DELETE",
        })
          .then((res) => {
            if (!res.ok) throw new Error("Failed to delete user");
            return res.json();
          })
          .then(() => {
            Swal.fire("Deleted!", "User has been deleted.", "success");
            fetchUsers();
          })
          .catch(() => Swal.fire("Error", "Could not delete user", "error"));
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Manage Users</h2>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center py-4 text-gray-500">
                No users found.
              </td>
            </tr>
          ) : (
            users.map((u) => (
              <tr key={u._id}>
                <td>{u.name || "N/A"}</td>
                <td>{u.email}</td>
                <td>{u.role || "User"}</td>
                <td className="space-x-1 text-center">
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => updateUserRole(u._id, "Admin")}
                    disabled={u.role === "Admin"}
                  >
                    Make Admin
                  </button>
                  <button
                    className="btn btn-accent btn-sm"
                    onClick={() => updateUserRole(u._id, "Restaurant")}
                    disabled={u.role === "Restaurant"}
                  >
                    Make Restaurant
                  </button>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => updateUserRole(u._id, "Charity")}
                    disabled={u.role === "Charity"}
                  >
                    Make Charity
                  </button>
                  <button
                    className="btn btn-error btn-sm"
                    onClick={() => deleteUser(u._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;

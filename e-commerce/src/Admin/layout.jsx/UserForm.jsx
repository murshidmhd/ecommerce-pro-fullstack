import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

function UserForm({ setShowAddForm, fetchUsers, editUser, setEditUser }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
  });

  useEffect(() => {
    if (editUser) {
      setFormData({
        name: editUser.name || "",
        email: editUser.email || "",
        role: editUser.role || "",
        password: "",
      });
    }
  }, [editUser]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editUser) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/users${editUser.id}`,
          formData
        );
        toast.success("updated user");
        setEditUser(null);
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/users`, formData);
        toast.success("added user");
      }

      setShowAddForm(false);
      setFormData({ name: "", email: "", role: "", password: "" });
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to save user");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md mb-6"
    >
      <h2 className="text-xl font-semibold mb-4">
        {editUser ? "Update User" : "Add New User"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="">Select Role</option>
          <option value="admin">admin</option>
          <option value="user">user</option>
          <option value="Moderator">Moderator</option>
        </select>
        <input
          type="password"
          name="password"
          placeholder={
            editUser ? "New Password (leave blank to keep current)" : "Password"
          }
          value={formData.password}
          onChange={handleChange}
          className="border p-2 rounded"
          required={!editUser}
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          {editUser ? "Update" : "Save"}
        </button>
        <button
          type="button"
          onClick={() => {
            setShowAddForm(false);
            setEditUser && setEditUser(null);
          }}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default UserForm;

import { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";
const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const fetchUsers = () => {
    axios
      .get(
        `http://localhost:8080/admin/farmers`
      )
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  };

  const searchUserById = (id) => {
    if (!id) {
      fetchUsers();
      return;
    }
    axios
      .get(
        `http://localhost:8080/farmer/${id}`
      )
      .then((response) => setUsers([response.data]))
      .catch((error) => console.error("Error searching user:", error));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(
          `http://localhost:8080/farmer/${id}`
        )
        .then(() => setUsers(users.filter((user) => user.id !== userId)))
        .catch((error) => console.error("Error deleting user:", error));
    }
  };

  return (
    <div className="flex">
      <AdminSidebar setActiveTab={() => {}} />{" "}
      <div className="flex-1 p-8 min-h-screen  flex flex-col items-center">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-8">
          User Management
        </h1>

        <input
          type="text"
          placeholder="Search user by ID..."
          className="border p-2 rounded mb-4 w-full max-w-4xl"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            searchUserById(e.target.value);
          }}
        />
        <div className=" w-full max-w-4xl bg-white rounded-lg shadow-lg">
          <table className="w-full border-collapse text-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-800 text-white text-lg">
              <tr>
                <th className="p-4">Id</th>
                <th className="p-4">Username</th>
                <th className="p-4">First Name</th>
                <th className="p-4">Middle Name</th>
                <th className="p-4">Last Name</th>
                <th className="p-4">Mobile Number</th>
                <th className="p-4">Email</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user.id}
                  className={
                    index % 2 === 0
                      ? "bg-gray-300 hover:bg-gray-200"
                      : "bg-white hover:bg-gray-200"
                  }
                >
                  <td className="p-4 text-center">{user.id}</td>
                  <td className="p-4 text-center">{user.username}</td>
                  <td className="p-4 text-center">{user.firstName}</td>
                  <td className="p-4 text-center">{user.middleName}</td>
                  <td className="p-4 text-center">{user.lastName}</td>
                  <td className="p-4 text-center">{user.mobileNumber}</td>
                  <td className="p-4 text-center">{user.email}</td>
                  <td className="p-4 text-center">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;

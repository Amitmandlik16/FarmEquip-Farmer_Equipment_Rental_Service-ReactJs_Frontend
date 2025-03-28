import { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";

const LaborManagement = () => {
  const [labors, setLabors] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch all labors
  const fetchLabors = () => {
    axios
      .get(
        `https://famerequipmentrental-springboot-production.up.railway.app/labor/all`
      )
      .then((response) => setLabors(response.data))
      .catch((error) => console.error("Error fetching labors:", error));
  };

  // Search labor by ID
  const searchLaborById = (id) => {
    if (!id) {
      fetchLabors();
      return;
    }
    axios
      .get(
        `https://famerequipmentrental-springboot-production.up.railway.app/labor/${id}`
      )
      .then((response) => setLabors([response.data]))
      .catch((error) => console.error("Error searching labor:", error));
  };

  useEffect(() => {
    fetchLabors();
  }, []);

  // Delete labor
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this labor?")) {
      axios
        .delete(
          `https://famerequipmentrental-springboot-production.up.railway.app/labor/${id}`
        )
        .then(() => setLabors(labors.filter((labor) => labor.id !== id)))
        .catch((error) => console.error("Error deleting labor:", error));
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <AdminSidebar setActiveTab={() => {}} />

      {/* Main Content */}
      <div className="flex-1 p-8 min-h-screen flex flex-col items-center">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-8">
          Labor Management
        </h1>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search labor by ID..."
          className="border p-2 rounded mb-4 w-full max-w-4xl"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            searchLaborById(e.target.value);
          }}
        />

        {/* Table */}
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg">
          <table className="w-full border-collapse text-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-800 text-white text-lg">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Name</th>
                <th className="p-4">Skills</th>
                <th className="p-4">Experience</th>
                <th className="p-4">Price/Day</th>
                <th className="p-4">Location</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {labors.map((labor, index) => (
                <tr
                  key={labor.id}
                  className={
                    index % 2 === 0
                      ? "bg-gray-300 hover:bg-gray-200"
                      : "bg-white hover:bg-gray-200"
                  }
                >
                  <td className="p-4 text-center">{labor.id}</td>
                  <td className="p-4 text-center">{labor.name}</td>
                  <td className="p-4 text-center">{labor.skills}</td>
                  <td className="p-4 text-center">{labor.experience} years</td>
                  <td className="p-4 text-center">₹{labor.pricePerDay}</td>
                  <td className="p-4 text-center">
                    {labor.location} ({labor.pincode})
                  </td>
                  <td className="p-4 text-center">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      onClick={() => handleDelete(labor.id)}
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

export default LaborManagement;

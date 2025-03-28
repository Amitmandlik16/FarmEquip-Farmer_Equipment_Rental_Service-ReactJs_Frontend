import { useState, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";

const AdminComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch(
          "https://famerequipmentrental-springboot-production.up.railway.app/farmer/complaint/all"
        );
        if (!response.ok) throw new Error("Failed to fetch complaints");

        const data = await response.json();
        setComplaints(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  return (
    <div className="flex">
      <AdminSidebar setActiveTab={() => {}} />
      <div className="flex-1 p-8 min-h-screen flex flex-col items-center">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-8">
          Farmer Complaints
        </h1>

        {loading ? (
          <p className="text-center text-lg font-semibold">
            Loading complaints...
          </p>
        ) : error ? (
          <p className="text-center text-red-500 font-semibold">{error}</p>
        ) : complaints.length === 0 ? (
          <p className="text-center text-gray-700 font-semibold">
            No complaints found.
          </p>
        ) : (
          <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg">
            <table className="w-full border-collapse text-gray-700">
              <thead className="bg-gray-100 dark:bg-gray-800 text-white text-lg">
                <tr>
                  <th className="p-4">Farmer ID</th>
                  <th className="p-4">Subject</th>
                  <th className="p-4">Description</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Time</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((complaint, index) => (
                  <tr
                    key={complaint.id}
                    className={
                      index % 2 === 0
                        ? "bg-gray-300 hover:bg-gray-200"
                        : "bg-white hover:bg-gray-200"
                    }
                  >
                    <td className="p-4 text-center">
                      {complaint.farmer?.id || "N/A"}
                    </td>
                    <td className="p-4 text-center">{complaint.subject}</td>
                    <td className="p-4 text-center">{complaint.description}</td>
                    <td className="p-4 text-center">{complaint.localDate}</td>
                    <td className="p-4 text-center">{complaint.localTime}</td>
                    <td className="p-4 text-center font-bold">
                      <span
                        className={`px-2 py-1 rounded ${
                          complaint.status === "Resolved"
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        {complaint.status || "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminComplaints;

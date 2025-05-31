import { useState, useEffect } from "react";
import axios from "axios";

const MyEquipment = () => {
  const [equipmentList, setEquipmentList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")); // Get farmer data from local storage
    if (!user) {
      alert("User not found. Please log in again.");
      return;
    }

    const fetchEquipment = async () => {
      try {
        const token = localStorage.getItem("token"); // Authentication token
        const response = await axios.get(
          `http://localhost:8080/booking/requests/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEquipmentList(response.data);
      } catch (error) {
        console.error("Error fetching equipment:", error);
        alert("Failed to fetch equipment. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchEquipment();
  }, []);

  const updateStatus = async (itemId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:8080/booking/update/${itemId}/${newStatus}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(`Status updated to ${newStatus}`);

      // Update the local state to reflect the new status
      setEquipmentList((prevList) =>
        prevList.map((item) =>
          item.id === itemId ? { ...item, status: newStatus } : item
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="text-center text-green-700 font-bold">Loading...</div>
    );
  }

  return (
    <div className="container mx-auto mt-10 p-6">
      <h2 className="text-3xl font-bold text-green-700 text-center mb-6">
        Requests
      </h2>

      {equipmentList.length === 0 ? (
        <p className="text-gray-600 text-center">No equipment available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {equipmentList.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-lg p-5 transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <h3 className="text-xl font-bold text-green-800">
                {item.equipment.name}
              </h3>
              <p className="text-gray-700">
                <strong>Category:</strong> {item.equipment.category}
              </p>
              <p className="text-gray-700">
                <strong>Borrower:</strong> {item.borrower.firstName}
              </p>
              <p className="text-gray-700">
                <strong>Brand:</strong> {item.equipment.brand}
              </p>
              <p className="text-gray-700">
                <strong>Status:</strong>{" "}
                <span
                  className={`px-3 py-1 rounded-lg  ${
                    item.status === "APPROVED"
                      ? "text-black"
                      : item.status === "REJECTED"
                  }`}
                >
                  {item.status}
                </span>
              </p>

              {item.status !== "APPROVED" && (
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => updateStatus(item.id, "APPROVED")}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus(item.id, "REJECTED")}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEquipment;

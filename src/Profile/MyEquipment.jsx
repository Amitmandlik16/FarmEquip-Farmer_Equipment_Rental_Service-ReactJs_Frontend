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
          `http://localhost:8080/farmer/equipment/all/${user.id}`,
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

  if (loading) {
    return (
      <div className="text-center text-green-700 font-bold">Loading...</div>
    );
  }

  return (
    <div className="container mx-auto  p-6">
      <h2 className="text-3xl font-extrabold text-green-700 dark:text-white text-center mb-8">
        My Equipment
      </h2>

      {equipmentList.length === 0 ? (
        <p className="text-gray-700 dark:text-gray-300 text-center">
          No equipment available.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {equipmentList.map((item) => (
            <div
              key={item.equipment.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6 transform transition duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {item.equipment.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  <strong>Category:</strong> {item.equipment.category}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <strong>Brand:</strong> {item.equipment.brand}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <strong>Price:</strong> ₹
                  {item.equipment.price.toLocaleString()}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <strong>Stock:</strong> {item.equipment.stock}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <strong>Condition:</strong>{" "}
                  {item.equipment.equipmentCondition}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <strong>Warranty:</strong> {item.equipment.warranty}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <strong>Location:</strong> {item.equipment.location} (
                  {item.equipment.pincode})
                </p>
              </div>

              {/* Equipment Images */}
              <div className="flex space-x-2 overflow-hidden">
                {item.imageUrls.length > 0 ? (
                  item.imageUrls.map((url, index) => (
                    <img
                      key={index}
                      src={`http://localhost:8080${url}`}
                      alt={`Equipment ${index + 1}`}
                      className="w-32 h-32 object-cover rounded-lg border border-gray-300 dark:border-gray-600 hover:scale-110 transition-transform duration-200"
                    />
                  ))
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">
                    No images available
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEquipment;

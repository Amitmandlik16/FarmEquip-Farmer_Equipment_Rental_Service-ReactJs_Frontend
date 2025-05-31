import { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";

const EquipmentListing = () => {
  const [equipments, setEquipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/admin/equipments"
        );
        setEquipments(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipments();
  }, []);

  return (
    <div className="flex">
      <AdminSidebar setActiveTab={() => {}} />
      <div className="flex-1 p-8 min-h-screen flex flex-col items-center">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-8">
          Equipment Listing
        </h1>

        {loading ? (
          <p className="text-center text-lg font-semibold">
            Loading equipments...
          </p>
        ) : error ? (
          <p className="text-center text-red-500 font-semibold">{error}</p>
        ) : equipments.length === 0 ? (
          <p className="text-center text-gray-700 font-semibold">
            No equipments found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {equipments.map((item) => {
              const { equipment, imageUrls } = item;
              return (
                <div
                  key={equipment.id}
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-300"
                >
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
                    {equipment.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    <strong>Category:</strong> {equipment.category}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    <strong>Brand:</strong> {equipment.brand}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    <strong>Price:</strong> ₹{equipment.price}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    <strong>Farmer ID:</strong> {equipment.owner.id}
                  </p>
                  <div className="flex overflow-x-auto space-x-2 mt-4">
                    {imageUrls.map((url, index) => (
                      <img
                        key={index}
                        src={`http://localhost:8080${url}`}
                        alt={`Image ${index + 1}`}
                        className="h-24 w-24 sm:h-32 sm:w-32 object-cover rounded-md"
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default EquipmentListing;

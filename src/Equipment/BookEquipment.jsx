import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BookEquipment = () => {
  const [equipmentList, setEquipmentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = async () => {
    try {
      const response = await axios.get(
        "https://famerequipmentrental-springboot-production.up.railway.app/admin/equipments"
      );
      setEquipmentList(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleDownloadImage = async (imageId) => {
    try {
      const response = await axios.get(
        `https://famerequipmentrental-springboot-production.up.railway.app/api/files/download/${imageId}`,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = `image_${imageId}.jpg`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      alert("Failed to download image");
    }
  };

  return (
    <div className="relative min-h-screen  p-4 sm:p-6 transition">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-4 sm:mb-6">
        Equipments
      </h2>

      {/* Loading & Error Handling */}
      {loading && (
        <p className="text-center text-white">Loading equipment...</p>
      )}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Equipment List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {equipmentList.length > 0 ? (
          equipmentList.map((item) => (
            <div
              onClick={() =>
                navigate(`/RentEquipment?eqId=${item.equipment.id}`)
              }
              key={item.equipment.id}
              className="bg-gray-100 p-4  rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
            >
              <img
                src={
                  item.imageUrls.length > 0
                    ? `https://famerequipmentrental-springboot-production.up.railway.app${item.imageUrls[0]}`
                    : "https://via.placeholder.com/150"
                }
                alt={item.equipment.name}
                className="w-full h-32 sm:h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-bold">
                {item.equipment.name.toUpperCase()}
              </h3>
              <p className="">{item.equipment.brand}</p>
              <p className="font-bold">Rs. {item.equipment.pricePerDay}/Day</p>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full"></p>
        )}
      </div>
    </div>
  );
};

export default BookEquipment;

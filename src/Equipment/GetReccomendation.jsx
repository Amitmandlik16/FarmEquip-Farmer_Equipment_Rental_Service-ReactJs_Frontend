import { useState, useEffect } from "react";
import axios from "axios";

const GetRecommendation = () => {
  const [formData, setFormData] = useState({
    typeOfWork: "",
    farmSize: "",
    latitude: "",
    longitude: "",
  });

  const [error, setError] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [equipmentDetails, setEquipmentDetails] = useState([]);

  // Fetch coordinates using Geolocation API
  const fetchCoordinates = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setFormData((prevFormData) => ({
          ...prevFormData,
          latitude: latitude.toString(), // Convert to string
          longitude: longitude.toString(), // Convert to string
        }));
        console.log("Coordinates fetched:", { latitude, longitude });
      },
      (error) => {
        console.error("Error fetching location:", error);
        alert("Failed to fetch location. Please enable location services.");
      }
    );
  };
  const fetchEquipmentDetails = async (recommendationIds) => {
    try {
      const equipmentPromises = recommendationIds.map((id) =>
        axios.get(
          `http://localhost:8080/farmer/equipment/${id}`
        )
      );
      const equipmentResponses = await Promise.all(equipmentPromises);
      const equipmentData = equipmentResponses.map((response) => response.data);
      console.log(equipmentData);
      setEquipmentDetails(equipmentData);
    } catch (err) {
      console.error("Error fetching equipment details:", err);
      alert("Failed to fetch equipment details.");
    }
  };

  // Automatically fetch coordinates when the component mounts
  useEffect(() => {
    fetchCoordinates();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:8080/farmer/equipment/recommend",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setRecommendations(response.data);
        console.log(response.data);
        alert("Recommendations fetched successfully!");
        // Fetch equipment details for the recommendation IDs
        const recommendationIds = response.data.map((rec) => rec.id);
        console.log(recommendationIds);
        fetchEquipmentDetails(recommendationIds);
      } else {
        throw new Error("Failed to fetch recommendations");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-20 mb-10 p-8  ">
      <h2 className="text-3xl font-bold text-center mb-6">
        Get Equipment Recommendation
      </h2>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <form onSubmit={handleSubmit}>
        {/* Type of Work */}
        <div className="mb-6">
          <label className="block font-medium mb-2">Type of Work</label>
          <select
            name="typeOfWork"
            value={formData.typeOfWork}
            onChange={handleChange}
            className="w-full p-3 border rounded-md  focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
            <option value="">Select Type of Work</option>
            <option value="Plowing">Plowing</option>
            <option value="Sowing">Sowing</option>
            <option value="Irrigation">Irrigation</option>
            <option value="Fertilizers">Fertilizers</option>
            <option value="Pesticides">Pesticides</option>
            <option value="Harvesting">Harvesting</option>
            <option value="Post-Harvesting">Post-Harvesting</option>
            <option value="Land-Leveling">Land-Leveling</option>
            <option value="Mulching">Mulching</option>
            <option value="Transport">Transport</option>
            <option value="Green House">Green House</option>
            <option value="Orchard">Orchard</option>
            <option value="Fodder Cultivation">Fodder Cultivation</option>
            <option value="Livestock Farming">Livestock Farming</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Farm Size */}
        <div className="mb-6">
          <label className="block  font-medium mb-2">Farm Size</label>
          <select
            name="farmSize"
            value={formData.farmSize}
            onChange={handleChange}
            className="w-full p-3  rounded-md  border focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
            <option value="">Select Farm Size</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-3 rounded-md text-white font-medium bg-green-600 hover:bg-green-700 transition duration-200"
        >
          Get Recommendation
        </button>
      </form>

      {/* Display Recommendations */}
      {equipmentDetails.length > 0 && (
        <div className=" container mt-6">
          <h3 className="text-2xl font-semibold mb-4 ">Recommendations:</h3>
          <ul className="p-4 rounded-md">
            {equipmentDetails.map((equipment, index) => (
              <li key={index} className="p-2 border-b dark:border-gray-600">
                <p>
                  <strong>Name:</strong> {equipment.equipment.name}
                </p>
                <p>
                  <strong>Type of Equipment:</strong>{" "}
                  {equipment.equipment.equipmentType}
                </p>
                {/* <img
                                    src={
                                        item.imageUrls.length > 0
                                            ? `http://localhost:8080${equipment.equipment.imageUrls[0]}`
                                            : "https://via.placeholder.com/150"
                                    }
                                    alt={item.equipment.name}
                                    className="w-full h-32 sm:h-40 object-cover rounded-md mb-4"
                                /> */}
                <p>
                  <strong>Location:</strong> {equipment.equipment.location}
                </p>
                <p>
                  <strong>Contact Info:</strong>{" "}
                  {equipment.equipment.owner.mobileNumber}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GetRecommendation;

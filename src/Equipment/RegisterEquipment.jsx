import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterEquipment = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    category: "", //select input
    brand: "",
    price: "",
    pricePerDay: "",
    stock: "",
    description: "",
    equipmentCondition: "", //select input
    warranty: "",
    equipmentType: "",
    farmSize: "", //select input
    manufactureYear: "",
    usageDuration: "",
    location: "",
    pincode: "",
    longitude: "",
    latitude: "",
    imageIds: "",
    owner: { id: user.id }, // Assuming logged-in farmer ID is 1
  });

  const [selectedImages, setSelectedImages] = useState([]);
  const [error, setError] = useState("");

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
          latitude,
          longitude,
        }));
        console.log("Coordinates fetched:", { latitude, longitude });
      },
      (error) => {
        console.error("Error fetching location:", error);
        alert("Failed to fetch location. Please enable location services.");
      }
    );
  };
  console.log(formData);
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

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(files);

    try {
      const uploadedImageIds = [];
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios.post(
          "https://famerequipmentrental-springboot-production.up.railway.app/api/files/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          uploadedImageIds.push(response.data.id);
        } else {
          throw new Error("Failed to upload image");
        }
      }

      setFormData((prevFormData) => ({
        ...prevFormData,
        imageIds: uploadedImageIds.join(","),
      }));
    } catch (err) {
      setError("Failed to upload images.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        "https://famerequipmentrental-springboot-production.up.railway.app/farmer/equipment/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      console.log(formData);

      if (!response.ok) throw new Error("Failed to register equipment");

      alert("Equipment registered successfully!");
      navigate("/BookEquipment"); // Redirect to equipment list after successful registration
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-20 mb-2 p-6 bg-green-100 dark:bg-gray-800 shadow-md rounded-lg">
      <h2 className="text-3xl font-semibold mb-6 justify-center flex items-center text-white">
        Register Equipment
      </h2>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <form onSubmit={handleSubmit}>
        {/* Equipment Information Section */}
        <h2 className="text-2xl font-semibold mb-6 text-white">
          Equipment Information
        </h2>
        <div className="mb-6">
          <label className="block text-white font-medium mb-2">
            Equipment Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Equipment Name"
            className="w-full p-3 border text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6 grid grid-cols-2 gap-4  text-white">
          <div>
            <label className="block font-medium mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3 bg-green-100 dark:bg-gray-800 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Category</option>
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
          <div>
            <label className="block font-medium mb-2">Brand</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="Brand"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        <div className="mb-6 grid grid-cols-2 gap-4 text-white">
          <div>
            <label className="block font-medium mb-2">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-2">Price Per Day</label>
            <input
              type="number"
              name="pricePerDay"
              value={formData.pricePerDay}
              onChange={handleChange}
              placeholder="Price"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-2">Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Stock"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        <div className="mb-6 text-white">
          <label className="block font-medium mb-2">Equipment Type</label>
          <input
            type="text"
            name="equipmentType"
            value={formData.equipmentType}
            onChange={handleChange}
            placeholder="Equipment Type"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6 text-white">
          <label className="block font-medium mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
          />
        </div>
        <div className="mb-6 grid grid-cols-2 gap-4 text-white">
          <div>
            <label className="block font-medium mb-2">Condition</label>
            <select
              name="equipmentCondition"
              value={formData.equipmentCondition}
              onChange={handleChange}
              className="w-full p-3 border bg-green-100 dark:bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Condition</option>
              <option value="Best_Equipment">Best Equipment</option>
              <option value="Good_Equipment">Good Equipment</option>
              <option value="Average_Equipment">Average Equipment</option>
            </select>
          </div>
          <div>
            <label className="block font-medium mb-2">Warranty</label>
            <input
              type="text"
              name="warranty"
              value={formData.warranty}
              onChange={handleChange}
              placeholder="Warranty"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        <div className="mb-6 grid grid-cols-2 gap-4 text-white">
          <div>
            <label className="block font-medium mb-2">Manufacture Year</label>
            <input
              type="number"
              name="manufactureYear"
              value={formData.manufactureYear}
              onChange={handleChange}
              placeholder="Manufacture Year"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-2">Usage Duration</label>
            <input
              type="text"
              name="usageDuration"
              value={formData.usageDuration}
              onChange={handleChange}
              placeholder="Usage Duration"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        <div className="mb-6 text-white">
          <label className="block font-medium mb-2">Farm Size</label>
          <select
            name="farmSize"
            value={formData.farmSize}
            onChange={handleChange}
            className="w-full p-3 bg-green-100 dark:bg-gray-800 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Farm Size</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        {/* Location Section */}
        <h2 className="text-2xl font-semibold mb-6 text-white">Location</h2>
        <div className="mb-6 grid grid-cols-2 gap-4 text-white">
          <div>
            <label className="block font-medium mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-2">Pincode</label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="Pincode"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Images Section */}
        <h2 className="text-2xl font-semibold mb-6 text-white">Images</h2>
        <div className="mb-6 text-white">
          <label className="block font-medium mb-2">Equipment Images</label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {selectedImages.length > 0 && (
            <div className="mt-2">
              <p>Selected Images:</p>
              <ul className="list-disc pl-5">
                {selectedImages.map((image, index) => (
                  <li key={index}>{image.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-3 rounded-md text-white font-medium bg-green-600 hover:bg-green-800"
        >
          Register Equipment
        </button>
      </form>
    </div>
  );
};

export default RegisterEquipment;

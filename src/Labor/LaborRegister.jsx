import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LaborRegister = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    skills: "",
    experience: "",
    pricePerDay: "",
    location: "",
    pincode: "",
    email: "",
    password: "",
    imageIds: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // Function to get geolocation
  const getLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prev) => ({
            ...prev,
            longitude: position.coords.longitude.toString(),
            latitude: position.coords.latitude.toString(),
          }));
        },
        (error) => {
          console.error("Geolocation Error:", error);
          setError("Failed to fetch location. Please allow location access.");
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Upload profile image and return image ID
  const uploadImage = async () => {
    if (!selectedFile) return "";

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        "https://famerequipmentrental-springboot-production.up.railway.app/api/files/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return response.data.imageId; // Extract image ID from response
    } catch (error) {
      console.error("Image Upload Error:", error);
      setError("Failed to upload image. Please try again.");
      return "";
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await getLocation(); // Fetch geolocation before submitting
      const imageId = await uploadImage(); // Upload image and get ID

      // Prepare final form data
      const finalData = {
        ...formData,
        imageIds: imageId ? imageId.toString() : "", // Assign image ID
      };

      const response = await axios.post(
        "https://famerequipmentrental-springboot-production.up.railway.app/labor/register",
        finalData
      );

      if (response.status === 200) {
        setSuccess("Labor registered successfully!");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center mt-20 min-h-screen bg-gray-100">
      <div className="bg-green-100 dark:bg-gray-800 p-8 rounded-lg shadow-lg w-11/12 sm:w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-4">
          Labor Registration
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Input Fields */}
          {[
            { name: "name", placeholder: "Full Name" },
            { name: "skills", placeholder: "Skills (comma-separated)" },
            {
              name: "experience",
              placeholder: "Experience (in years)",
              type: "number",
            },
            {
              name: "pricePerDay",
              placeholder: "Price per day (₹)",
              type: "number",
            },
            { name: "location", placeholder: "Location" },
            { name: "pincode", placeholder: "Pincode" },
            { name: "email", placeholder: "Email", type: "email" },
            { name: "password", placeholder: "Password", type: "password" },
          ].map((field, index) => (
            <input
              key={index}
              type={field.type || "text"}
              name={field.name}
              placeholder={field.placeholder}
              className="w-full px-3 py-2 border rounded-lg bg- text-black"
              value={formData[field.name]}
              onChange={handleChange}
              required
            />
          ))}

          {/* Profile Photo Upload */}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border rounded-lg bg- text-black"
            required
          />

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Redirect to Login */}
        <p className="text-center text-gray-600 mt-4">
          Already registered?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-green-600 hover:underline cursor-pointer"
          >
            Login here
          </span>
        </p>
      </div>
    </section>
  );
};

export default LaborRegister;

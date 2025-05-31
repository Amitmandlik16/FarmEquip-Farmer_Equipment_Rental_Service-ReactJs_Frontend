import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Complain = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    subject: "",
    description: "",
    farmerId: null, // Will be set after checking login
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [responseData, setResponseData] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setResponseData(null);

    if (!formData.subject || !formData.description) {
      setError("Both fields are required.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/farmer/complaint",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subject: formData.subject,
            description: formData.description,
            farmer: { id: formData.farmerId },
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to submit complaint");

      const data = await response.json();
      setSuccess("Complaint submitted successfully!");
      setResponseData(data);
      setFormData({
        subject: "",
        description: "",
        farmerId: formData.farmerId,
      });
    } catch (err) {
      setError(err.message);
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        <h2 className="text-xl font-bold mb-4">You are not logged in</h2>
        <p className="text-gray-600 mb-4">
          Please log in to submit a complaint.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white dark:bg-gray-800 shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-4">
        Submit a Complaint
      </h2>

      {error && <p className="text-red-500 text-center">{error}</p>}
      {success && <p className="text-green-500 text-center">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Subject Input */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300">
            Subject
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Enter subject"
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-green-500 bg-gray-50 dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Description Textarea */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your complaint"
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-green-500 bg-gray-50 dark:bg-gray-700 dark:text-white"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
        >
          Submit Complaint
        </button>
      </form>

      {responseData && (
        <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
            Complaint Details
          </h3>
          <p className="text-gray-800 dark:text-gray-300">
            <strong>ID:</strong> {responseData.id}
          </p>
          <p className="text-gray-800 dark:text-gray-300">
            <strong>Subject:</strong> {responseData.subject}
          </p>
          <p className="text-gray-800 dark:text-gray-300">
            <strong>Description:</strong> {responseData.description}
          </p>
          <p className="text-gray-800 dark:text-gray-300">
            <strong>Date:</strong> {responseData.localDate}
          </p>
          <p className="text-gray-800 dark:text-gray-300">
            <strong>Time:</strong> {responseData.localTime}
          </p>
        </div>
      )}
    </div>
  );
};

export default Complain;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Feedback = () => {
  const [formData, setFormData] = useState({
    rating: "",
    improvements: "",
    issues: "",
    additionalComments: "",
    recommendation: "",
  });

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); // Check if user is logged in

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const feedbackData = {
      farmer: {
        id: user.id,
      },
      rating: parseInt(formData.rating),
      improvements: formData.improvements,
      issues: formData.issues,
      additionalComments: formData.additionalComments,
      recommendation: formData.recommendation === "yes",
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/farmer/feedback", // Update with actual endpoint
        feedbackData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      console.log("Feedback submitted:", response.data);
      alert("Thank you for your feedback!");
      navigate("/");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Error submitting feedback. Please try again.");
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <p className="text-red-500">
          You must be logged in to submit feedback.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-4">
          Feedback Form
        </h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-gray-700 dark:text-gray-300">
            Overall Experience (Rating 1-5)
          </label>
          <input
            type="number"
            name="rating"
            min="1"
            max="5"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-green-500 bg-gray-50 dark:bg-gray-700 dark:text-white mb-3"
            value={formData.rating}
            onChange={handleChange}
            required
          />

          <textarea
            name="improvements"
            placeholder="What improvements would you suggest?"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-green-500 bg-gray-50 dark:bg-gray-700 dark:text-white mb-3"
            value={formData.improvements}
            onChange={handleChange}
          ></textarea>

          <textarea
            name="issues"
            placeholder="Did you face any issues?"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-green-500 bg-gray-50 dark:bg-gray-700 dark:text-white mb-3"
            value={formData.issues}
            onChange={handleChange}
          ></textarea>

          <textarea
            name="additionalComments"
            placeholder="Any additional comments?"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-green-500 bg-gray-50 dark:bg-gray-700 dark:text-white mb-3"
            value={formData.additionalComments}
            onChange={handleChange}
          ></textarea>

          <label className="block mb-2 text-gray-700 dark:text-gray-300">
            Would you recommend this platform?
          </label>
          <div className="flex gap-4 mb-4">
            <label className="text-gray-700 dark:text-gray-300">
              <input
                type="radio"
                name="recommendation"
                value="yes"
                onChange={handleChange}
                required
              />
              Yes
            </label>
            <label className="text-gray-700 dark:text-gray-300">
              <input
                type="radio"
                name="recommendation"
                value="no"
                onChange={handleChange}
                required
              />
              No
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
          >
            Submit Feedback
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full mt-2 bg-gray-400 text-white py-2 rounded-md hover:bg-gray-500 transition"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;

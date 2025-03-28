import { useState, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";

const AdminFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch(
          "https://famerequipmentrental-springboot-production.up.railway.app/farmer/feedback/all"
        );
        if (!response.ok) throw new Error("Failed to fetch feedbacks");

        const data = await response.json();
        setFeedbacks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6 bg-gray-100">
        <h1 className="text-2xl md:text-3xl font-bold text-green-100 dark:text-gray-900 mb-4 text-center">
          Farmer Feedback
        </h1>

        {loading ? (
          <p className="text-center text-lg font-semibold">
            Loading feedbacks...
          </p>
        ) : error ? (
          <p className="text-center text-red-500 font-semibold">{error}</p>
        ) : feedbacks.length === 0 ? (
          <p className="text-center text-gray-700 font-semibold">
            No feedback found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {feedbacks.map((feedback) => (
              <div
                key={feedback.id}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-300"
              >
                <p className="text-gray-800 dark:text-white font-semibold">
                  <span className="font-bold">User ID:</span>{" "}
                  {feedback.farmer?.id || "N/A"}
                </p>
                <p className="text-gray-800 dark:text-white font-semibold">
                  <span className="font-bold">Username:</span>{" "}
                  {feedback.farmer?.username || "N/A"}
                </p>
                <p className="text-gray-800 dark:text-white">
                  <span className="font-bold">Rating:</span> {feedback.rating}/5
                </p>
                <p className="text-gray-800 dark:text-white">
                  <span className="font-bold">Improvements:</span>{" "}
                  {feedback.improvements || "None"}
                </p>
                <p className="text-gray-800 dark:text-white">
                  <span className="font-bold">Issues:</span>{" "}
                  {feedback.issues || "None"}
                </p>
                <p className="text-gray-800 dark:text-white">
                  <span className="font-bold">Comments:</span>{" "}
                  {feedback.additionalComments || "No comments"}
                </p>
                <p className="text-gray-800 dark:text-white">
                  <span className="font-bold">Recommended:</span>{" "}
                  {feedback.recommendation ? "Yes" : "No"}
                </p>
                <p className="text-white text-sm mt-2">
                  <span className="font-bold">Date:</span> {feedback.localDate}
                </p>
                <p className="text-white text-sm">
                  <span className="font-bold">Time:</span> {feedback.localTime}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminFeedback;

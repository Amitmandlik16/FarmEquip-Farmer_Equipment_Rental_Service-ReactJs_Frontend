import { useState, useEffect } from "react";
import axios from "axios";

const LaborRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user")); // Get logged-in farmer
  const farmerId = user?.id;

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          `https://famerequipmentrental-springboot-production.up.railway.app/booking/labor/requests/${farmerId}`
        );
        setRequests(response.data);
      } catch (err) {
        console.error("Error fetching labor requests:", err);
        setError("Failed to fetch labor requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [farmerId]);

  const markComplete = async (bookingId) => {
    try {
      await axios.put(
        `https://famerequipmentrental-springboot-production.up.railway.app/booking/labor/mark-completed/${bookingId}`
      );
      setRequests((prev) =>
        prev.map((req) =>
          req.id === bookingId ? { ...req, status: "COMPLETED" } : req
        )
      );
    } catch (err) {
      console.error("Error marking as complete:", err);
    }
  };

  if (loading) return <p className="text-center mt-6">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-6">{error}</p>;

  return (
    <div className="p-6 max-w-3xl mt-20 mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">Labor Requests</h2>
      {requests.length === 0 ? (
        <p className="text-center text-gray-600">No labor requests found.</p>
      ) : (
        <div className="space-y-4">
          {requests.map((request) => (
            <div
              key={request.id}
              className="bg-white shadow-md p-4 rounded-lg border border-gray-300"
            >
              <p>
                <strong>Labor Name:</strong> {request.labor.name}
              </p>
              <p>
                <strong>Skills:</strong> {request.labor.skills}
              </p>
              <p>
                <strong>Start Date:</strong> {request.startDate}
              </p>
              <p>
                <strong>End Date:</strong> {request.endDate}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`px-2 py-1 rounded ${
                    request.status === "APPROVED"
                      ? "bg-white-600 "
                      : request.status === "REJECTED"
                      ? "bg-white-600 "
                      : request.status === "COMPLETED"
                      ? "bg-white-600 "
                      : "bg-white-500 "
                  }`}
                >
                  {request.status}
                </span>
              </p>
              {/* Mark Complete button (hidden if already completed) */}
              {request.status !== "COMPLETED" && (
                <div className="mt-4">
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick={() => markComplete(request.id)}
                  >
                    Mark Complete
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

export default LaborRequest;

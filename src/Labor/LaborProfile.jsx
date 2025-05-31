import { useState, useEffect } from "react";
import axios from "axios";

const LaborRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user")); // Get logged-in laborer
  const laborId = user?.id;

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/booking/labor/requests/${laborId}`
        );
        setRequests(response.data);
      } catch (err) {
        console.error("Error fetching requests:", err);
        setError("Failed to fetch labor requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [laborId]);

  const handleAction = async (bookingId, status) => {
    try {
      await axios.put(
        `http://localhost:8080/booking/labor/update/${bookingId}/${status}`
      );
      setRequests((prev) =>
        prev.map((req) =>
          req.id === bookingId ? { ...req, status, actionTaken: true } : req
        )
      );
    } catch (err) {
      console.error(`Error updating request:`, err);
    }
  };

  if (loading) return <p className="text-center mt-6">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-6">{error}</p>;

  return (
    <div className="p-6 max-w-3xl mt-20 mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">Labor Requests</h2>
      {requests.length === 0 ? (
        <p className="text-center text-gray-600">No requests available.</p>
      ) : (
        <div className="space-y-4">
          {requests.map((request) => (
            <div
              key={request.id}
              className="bg-white shadow-md p-4 rounded-lg border border-gray-300"
            >
              <p>
                <strong>Farmer Email:</strong> {request.farmerEmail}
              </p>
              <p>
                <strong>Start Date:</strong> {request.startDate}
              </p>
              <p>
                <strong>End Date:</strong> {request.endDate}
              </p>
              <p>
                <strong>Payment Method:</strong> {request.paymentMethod}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`px-2 py-1 rounded ${
                    request.status === "APPROVED"
                      ? "bg-white-600 "
                      : request.status === "REJECTED"
                      ? "bg-white-600 "
                      : "bg-white-500 "
                  }`}
                >
                  {request.status}
                </span>
              </p>
              {/* Hide buttons after action */}
              {!request.actionTaken && (
                <div className="mt-4 flex gap-4">
                  <button
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    onClick={() => handleAction(request.id, "APPROVED")}
                  >
                    Accept
                  </button>
                  <button
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    onClick={() => handleAction(request.id, "REJECTED")}
                  >
                    Reject
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

export default LaborRequests;

import React, { useState, useEffect } from "react";
import LaborInfo from "./LaborInfo"; // Import the LaborInfo component

const SearchLabors = () => {
  const [searchType, setSearchType] = useState("skill");
  const [searchQuery, setSearchQuery] = useState("");
  const [labors, setLabors] = useState([]);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);
  const [selectedLabor, setSelectedLabor] = useState(null); // Track selected labor

  useEffect(() => {
    fetchAllLabors();
  }, []);

  const fetchAllLabors = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/labor/all"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch labor data.");
      }
      const data = await response.json();
      setLabors(data);
    } catch (err) {
      setError("Error fetching data: " + err.message);
    }
  };

  const fetchLaborsByQuery = async () => {
    setError("");
    setLabors([]);
    setSearched(true);

    if (!searchQuery.trim()) {
      setError(`Please enter a ${searchType}.`);
      return;
    }

    try {
      const encodedQuery = encodeURIComponent(searchQuery);
      const apiEndpoint =
        searchType === "skill"
          ? `http://localhost:8080/labor/skill/${encodedQuery}`
          : `http://localhost:8080/labor/location/${encodedQuery}`;

      const response = await fetch(apiEndpoint);

      if (!response.ok) {
        throw new Error(`No labor found with ${searchType}: ${searchQuery}`);
      }

      const data = await response.json();
      setLabors(data);
    } catch (err) {
      setError("Error fetching data: " + err.message);
    }
  };

  if (selectedLabor) {
    return (
      <LaborInfo labor={selectedLabor} onBack={() => setSelectedLabor(null)} />
    );
  }

  return (
    <div className="container mt-20 mx-auto p-4">
      <h2 className="text-2xl font-bold text-center text-green-700 mb-4">
        Search for Labors
      </h2>

      {/* Toggle Button */}
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setSearchType("skill")}
          className={`px-4 py-2 rounded-l ${
            searchType === "skill"
              ? "bg-green-700 text-white"
              : "bg-green-100 dark:bg-gray-700 text-white"
          }`}
        >
          Search by Skill
        </button>
        <button
          onClick={() => setSearchType("location")}
          className={`px-4 py-2 rounded-r ${
            searchType === "location"
              ? "bg-green-700 text-white"
              : "bg-green-100 dark:bg-gray-700 text-white"
          }`}
        >
          Search by Location
        </button>
      </div>

      {/* Search Input */}
      <div className="flex justify-center">
        <input
          type="text"
          placeholder={`Enter ${searchType} (e.g., ${
            searchType === "skill" ? "Ploughing" : "Pune"
          })`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded-l w-1/2"
        />
        <button
          onClick={fetchLaborsByQuery}
          className="bg-green-700 text-white px-4 py-2 rounded-r"
        >
          Search
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-center mt-2">{error}</p>}

      {/* Display Labors */}
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        {labors.length > 0 ? (
          labors.map((labor) => (
            <div
              key={labor.id}
              onClick={() => setSelectedLabor(labor)} // Click to show details
              className=" p-4 rounded bg-gray-100 shadow-lg cursor-pointer hover:bg-gray-100"
            >
              <h3 className="font-bold text-lg">{labor.name}</h3>
              <p className="text-gray-700">Skills: {labor.skills}</p>
              <p className="text-gray-700">
                Experience: {labor.experience} years
              </p>
              <p className="text-gray-900 font-semibold">
                Price Per Day: ₹{labor.pricePerDay}
              </p>
              <p className="text-gray-700">Location: {labor.location}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default SearchLabors;

import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import profile from "../assets/profile.png";

const LaborInfo = ({ labor, onBack }) => {
  if (!labor) return null; // Ensure labor data is available

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [bookedDates, setBookedDates] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("COD");

  useEffect(() => {
    const fetchLaborAvailability = async () => {
      try {
        const response = await axios.get(
          `https://famerequipmentrental-springboot-production.up.railway.app/booking/labor/calendar/${labor.id}`
        );
        setBookedDates(response.data.bookedDates);
      } catch (error) {
        console.error("Error fetching labor availability:", error);
        alert("Failed to fetch labor availability. Please try again.");
      }
    };

    fetchLaborAvailability();
  }, [labor.id]);

  const handleBookLabor = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const requestBody = {
      labor: { id: labor.id }, // ✅ Now correctly formatted
      farmerId: user.id,
      farmerEmail: user.email,
      startDate: startDate,
      endDate: endDate,
      paymentMethod: paymentMethod,
    };

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "https://famerequipmentrental-springboot-production.up.railway.app/booking/labor/request",
        requestBody,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Labor booking request sent successfully!");

      const bookingId = response.data.id;

      const receiptResponse = await axios.get(
        `https://famerequipmentrental-springboot-production.up.railway.app/booking/labor/download-receipt/${bookingId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([receiptResponse.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = `Labor_Booking_Receipt_${bookingId}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();

      alert("Receipt downloaded successfully!");
    } catch (error) {
      console.error("Error during labor booking:", error);
      alert("Failed to book labor. Please try again.");
    }
  };

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const dateString = date.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
      if (bookedDates.includes(dateString)) {
        return "booked-date"; // Apply a CSS class for styling
      }
    }
    return null;
  };

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const dateString = date.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
      if (bookedDates.includes(dateString)) {
        return (
          <div
            style={{
              backgroundColor: "red",
              color: "white",
              borderRadius: "50%",
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {date.getDate()}
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div className="container mx-auto p-6">
      <button
        onClick={onBack}
        className="mb-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
      >
        ← Back
      </button>

      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg p-6">
        {/* Profile Image */}
        <div className="md:w-1/3 flex justify-center">
          <img
            src={labor.profileImage || profile} // Show profile image if available
            alt={`${labor.name} Profile`}
            className="w-40 h-40 rounded-full border"
          />
        </div>

        {/* Labor Information */}
        <div className="md:w-2/3 p-4">
          <h2 className="text-2xl font-bold text-green-700">{labor.name}</h2>
          <p className="text-gray-700">
            <strong>Skills:</strong> {labor.skills}
          </p>
          <p className="text-gray-700">
            <strong>Experience:</strong> {labor.experience} years
          </p>
          <p className="text-gray-700">
            <strong>Price Per Day:</strong> ₹{labor.pricePerDay}
          </p>
          <p className="text-gray-700">
            <strong>Location:</strong> {labor.location}
          </p>
          <p className="text-gray-700">
            <strong>Contact:</strong> {labor.contact}
          </p>
        </div>
      </div>

      {/* 📆 Calendar & Booking Form in a Row */}
      <div className="flex flex-col md:flex-row gap-12 mt-6">
        {/* Calendar */}
        <div className="w-1/3">
          <h3 className="text-lg font-bold text-gray-700">
            Availability Calendar
          </h3>
          <Calendar tileClassName={tileClassName} tileContent={tileContent} />
        </div>

        {/* Booking Form (Increased Width) */}
        <div className="w-2/3 p-6 bg-gray-100 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-gray-700">Book This Labor</h3>
          <label className="block text-gray-700 mt-4">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-2 border rounded-md"
          />

          <label className="block text-gray-700 mt-4">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full p-2 border rounded-md"
          />

          <label className="block text-gray-700 mt-4">Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="COD">Cash on Delivery</option>
            <option value="Online">Online Payment</option>
          </select>

          <button
            onClick={handleBookLabor}
            className="mt-4 bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700"
          >
            Hire Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default LaborInfo;

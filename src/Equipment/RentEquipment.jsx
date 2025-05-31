import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Calendar from "react-calendar"; // Import the calendar component
import "react-calendar/dist/Calendar.css"; // Import calendar styles
import { useTranslation } from "react-i18next";

const user = JSON.parse(localStorage.getItem("user"));

const RentEquipment = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const eqId = queryParams.get("eqId"); // Retrieve eqId from query parameters
  const { t } = useTranslation();
  const [equipment, setEquipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState(""); // For main image display
  const [startDate, setStartDate] = useState(""); // Start date input
  const [endDate, setEndDate] = useState(""); // End date input
  const [paymentMethod, setPaymentMethod] = useState("COD"); // Default payment method
  const [bookedDates, setBookedDates] = useState([]); // Dates where equipment is already booked

  useEffect(() => {
    const fetchEquipmentDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8080/farmer/equipment/${eqId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setEquipment(response.data);
        setMainImage(response.data.imageUrls[0]); // Set first image as main image
      } catch (error) {
        console.error("Error fetching equipment details:", error);
        alert("Failed to fetch equipment details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    const fetchBookingCalendar = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/booking/calendar/${eqId}`
        );
        console.log(response.data);
        setBookedDates(response.data.bookedDates);
      } catch (error) {
        console.error("Error fetching booking calendar:", error);
        alert("Failed to fetch booking calendar. Please try again.");
      }
    };

    fetchEquipmentDetails();
    fetchBookingCalendar();
  }, [eqId]);

  const handleRentNow = async () => {
    const requestBody = {
      equipmentId: eqId,
      borrowerId: user.id,
      startDate: startDate,
      endDate: endDate,
      paymentMethod: paymentMethod,
    };

    console.log(requestBody);

    try {
      const token = localStorage.getItem("token");

      // Step 1: Send booking request
      const response = await axios.post(
        "http://localhost:8080/booking/request",
        requestBody,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Booking request sent successfully!");

      // Step 2: Retrieve bookingId from the response
      const bookingId = response.data.id;

      // Step 3: Download the receipt
      const receiptResponse = await axios.get(
        `http://localhost:8080/booking/pdf/${bookingId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob", // Important for downloading files
        }
      );

      // Step 4: Create a download link for the receipt
      const url = window.URL.createObjectURL(new Blob([receiptResponse.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = `Booking_Receipt_${bookingId}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();

      alert("Receipt downloaded successfully!");
    } catch (error) {
      console.error("Error during booking or downloading receipt:", error);
      alert(
        "Failed to complete booking or download receipt. Please try again."
      );
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

  if (loading) {
    return (
      <div className="text-center text-green-700 font-bold">Loading...</div>
    );
  }

  if (!equipment) {
    return (
      <div className="text-center text-red-600 font-bold">
        Equipment not found.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mt-10 mt-20 mx-auto p-6 bg-gray-100 rounded-lg shadow-lg flex flex-col md:flex-row">
      {/* Left Side - Images */}
      <div className="w-full md:w-1/2">
        <img
          src={`http://localhost:8080${mainImage}`}
          alt="Main Equipment"
          className="w-full h-64 object-cover rounded-lg shadow-md"
        />
        <div className="flex mt-4 space-x-2">
          {equipment.imageUrls.map((url, index) => (
            <img
              key={index}
              src={`http://localhost:8080${url}`}
              alt={`Thumbnail ${index + 1}`}
              className={`w-20 h-20 object-cover rounded-md cursor-pointer ${
                mainImage === url ? "border-2 border-green-600" : ""
              }`}
              onClick={() => setMainImage(url)}
            />
          ))}
        </div>
        <div className="mt-8">
          <h3 className="text-lg font-bold ">{t("booking_calendar")}</h3>
          <Calendar tileClassName={tileClassName} tileContent={tileContent} />
        </div>
        {/* Booking Legend at the Bottom */}
        <div className="flex items-center gap-3  mt-6">
          <div className="w-4 h-4 bg-red-600 rounded-full"></div>
          <span className="">{t("booked_dates")}</span>
          <div className="w-4 h-4 bg-yellow-300 rounded-full"></div>
          <span className=" ">{t("current_date")}</span>
          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
          <span className=" ">{t("selected_date")}</span>
        </div>
      </div>

      {/* Right Side - Equipment Details */}
      <div className="w-full md:w-1/2 md:pl-6 mt-6 md:mt-3">
        <h2>{equipment.name}</h2>
        <p className=" text-xl ">
          <strong>{t("category")}:</strong> {equipment.equipment.category}
        </p>
        <p className=" text-xl ">
          <strong>{t("brand")}:</strong> {equipment.equipment.brand}
        </p>
        <p className=" text-xl ">
          <strong>{t("price")}:</strong> ₹{equipment.equipment.price}
        </p>
        <p className=" text-xl ">
          <strong>{t("stock")}:</strong> {equipment.equipment.stock}
        </p>
        <p className=" text-xl ">
          <strong>{t("description3")}:</strong>{" "}
          {equipment.equipment.description}
        </p>
        <p className=" text-xl ">
          <strong>{t("location")}:</strong> {equipment.equipment.location}
        </p>
        <p className=" text-xl ">
          <strong>{t("pincode")}:</strong> {equipment.equipment.pincode}
        </p>
        <h2 className="text-2xl font-bold ">{equipment.name}</h2>
        {/* Calendar */}

        {/* Booking Form */}
        <div className="mt-38">
          <h3 className="text-lg font-bold ">{t("booking_form")}</h3>
          <label className="block ">{t("start_date")}</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-2 border rounded-md bg-gray-800  bg-white "
          />

          <label className="block  mt-4">{t("end_date")}</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full p-2 border rounded-md bg-white "
          />

          <label className="block  mt-4">{t("payment_method")}</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full p-2 border rounded-md bg-white"
          >
            <option value="COD">{t("cash_on_delivery")}</option>
            <option value="Online">{t("online_payment")}</option>
          </select>
        </div>

        {/* Rent Now Button */}
        <button
          onClick={handleRentNow}
          className="mt-4 bg-green-600  py-2 px-6 rounded-lg hover:bg-green-700"
        >
          {t("rent_now")}
        </button>
      </div>
    </div>
  );
};

export default RentEquipment;

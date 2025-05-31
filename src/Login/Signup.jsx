import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    middleName: "",
    lastName: "",
    country: "India",
    state: "",
    district: "",
    taluka: "",
    village: "",
    pincode: "",
    longitude: "",
    latitude: "",
    dob: "",
    landmark: "",
    mobileNumber: "",
    email: "",
    profileImgId: null,
  });

  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { t } = useTranslation();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input for profile image
  const handleFileChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  // Fetch longitude and latitude using OpenStreetMap API
  const fetchCoordinates = async () => {
    const { village, taluka, district, state, country } = formData;
    if (!village || !taluka || !district || !state || !country) {
      setError("Please fill in all location fields to fetch coordinates.");
      return;
    }

    const query = `${village}, ${taluka}, ${district}, ${state}, ${country}`;
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}`
      );
      if (response.data && response.data.length > 0) {
        const { lat, lon } = response.data[0];
        setFormData({ ...formData, latitude: lat, longitude: lon });
        setError("");
      } else {
        setError("");
      }
    } catch (err) {
      setError("Error fetching coordinates. Please try again.");
      console.error(err);
    }
  };

  // Handle image upload
  const uploadImage = async () => {
    if (!profileImage) {
      setError("Please select a profile image.");
      return null;
    }

    const imageFormData = new FormData();
    imageFormData.append("file", profileImage);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/files/upload",
        imageFormData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return response.data.id; // Return the profileImgId
    } catch (err) {
      setError("Error uploading image. Please try again.");
      console.error(err);
      return null;
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Fetch coordinates if not already fetched
    if (!formData.latitude || !formData.longitude) {
      await fetchCoordinates();
    }

    // Upload image and get profileImgId
    const profileImgId = await uploadImage();
    if (!profileImgId) {
      setLoading(false);
      return;
    }

    // Prepare data for registration
    const registrationData = {
      username: formData.username,
      password: formData.password,
      firstName: formData.firstName,
      middleName: formData.middleName,
      lastName: formData.lastName,
      country: formData.country,
      state: formData.state,
      district: formData.district,
      taluka: formData.taluka,
      village: formData.village,
      pincode: formData.pincode,
      longitude: formData.longitude,
      latitude: formData.latitude,
      dob: formData.dob,
      landmark: formData.landmark,
      mobileNumber: formData.mobileNumber,
      email: formData.email,
      totalEquipment: 0,
      ratingAsGiver: 0.0,
      ratingAsTaker: 0.0,
      totalRentalsGiven: 0,
      totalRentalsTaken: 0,
      totalRewards: 0,
      profileImgId: profileImgId,
    };

    // Register the farmer
    try {
      const response = await axios.post(
        "http://localhost:8080/farmer/register",
        registrationData
      );
      setSuccess("Registration successful!");
      setFormData({
        username: "",
        password: "",
        firstName: "",
        middleName: "",
        lastName: "",
        country: "",
        state: "",
        district: "",
        taluka: "",
        village: "",
        pincode: "",
        longitude: "",
        latitude: "",
        dob: "",
        landmark: "",
        mobileNumber: "",
        email: "",
        profileImgId: null,
      });
      setProfileImage(null);
    } catch (err) {
      setError("Error registering farmer. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-20 mb-2 p-6 bg-green-100 dark:bg-gray-800 shadow-md rounded-lg">
      <h2 className="text-3xl font-semibold mb-6 justify-center flex items-center text-white">
        {t("signup1")}
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Name Section */}
        <h2 className="text-2xl font-semibold mb-6 text-white">
          {t("basicInfo")}
        </h2>
        <div className="mb-6">
          <label className="block text-white font-medium mb-2">
            {t("name")}
          </label>
          <div className="text-white grid grid-cols-3 gap-4">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder={t("firstName")}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
              placeholder={t("middleName")}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder={t("lastName")}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Username and Password */}
        <div className="mb-6 text-white">
          <label className="block  font-medium mb-2">{t("username1")}</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder={t("username1")}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6 text-white">
          <label className="block font-medium mb-2">{t("password1")}</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder={t("password1")}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        {/* Date of Birth */}
        <div className="mb-6 text-white">
          <label className="block font-medium mb-2">{t("dob")}</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        {/* Email and Mobile Number */}
        <h2 className="text-2xl font-semibold mb-6 text-white">
          {t("contactInfo")}
        </h2>
        <div className="mb-6 grid grid-cols-2 gap-4 text-white">
          <div>
            <label className="block font-medium mb-2">{t("email1")}</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t("email1")}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-white font-medium mb-2">
              {t("mobileNumber")}
            </label>
            <input
              type="text"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Address Section */}
        <h2 className="text-2xl font-semibold mb-6 text-white">
          {t("address")}
        </h2>
        <div className="mb-6 grid grid-cols-2 gap-4 text-white">
          <div>
            <label className="block  font-medium mb-2">{t("state")}</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder={t("state")}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-white font-medium mb-2">
              {t("district")}
            </label>
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
              placeholder={t("district")}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        <div className="mb-6 text-white grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-2">{t("village")}</label>
            <input
              type="text"
              name="village"
              value={formData.village}
              onChange={handleChange}
              placeholder={t("village")}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-white font-medium mb-2">
              {t("taluka")}
            </label>
            <input
              type="text"
              name="taluka"
              value={formData.taluka}
              onChange={handleChange}
              placeholder={t("taluka")}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        <div className="mb-6 text-white">
          <label className="block font-medium mb-2">{t("landmark")}</label>
          <input
            type="text"
            name="landmark"
            value={formData.landmark}
            onChange={handleChange}
            placeholder={t("landmark")}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Profile Image */}
        <div className="mb-6 text-white">
          <label className="block  font-medium mb-2">{t("profileImage")}</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Error and Success Messages */}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full p-3 rounded-md text-white font-medium ${
            loading
              ? "bg-green-600 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-800"
          }`}
        >
          {loading ? t("registering") : t("register")}
        </button>
      </form>
      <p className="text-center text-gray-600 dark:text-gray-300 mt-4">
        {t("alreadyHaveAccount")}{" "}
        <Link to="/login" className="text-green-600 hover:underline">
          {t("login")}
        </Link>
      </p>
    </div>
  );
};

export default SignupForm;

import React, { useState, useEffect } from "react";

const MyProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data from localStorage or an API
    const fetchUserData = async () => {
      const userData = JSON.parse(localStorage.getItem("user"));
      setUser(userData);
    };

    fetchUserData();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center p-6  min-h-screen">
      <div className="bg-gray-100 dark:bg-gray-900 mt-10 shadow-lg rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-2xl text-green-500 font-bold text-center mb-6 text-gray-800">
          My Profile
        </h2>

        {/* Basic Information */}
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md mb-4">
          <h3 className="text-lg text-white font-semibold text-gray-700 mb-2">
            Basic Information
          </h3>
          <p className="text-white">
            Full Name:{" "}
            {user.firstName + " " + user.middleName + " " + user.lastName}
          </p>
          <p className="text-white">Email: {user.email}</p>
          <p className="text-white">Phone: {user.mobileNumber}</p>
          <p className="text-white">Date of Birth: {user.dob}</p>
        </div>

        {/* Address Details */}
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md mb-4">
          <h3 className="text-lg text-white font-semibold text-gray-700 mb-2">
            Address Details
          </h3>
          <p className="text-white">Country: {user.country}</p>
          <p className="text-white">State: {user.state}</p>
          <p className="text-white">District: {user.district}</p>
          <p className="text-white">Taluka: {user.taluka}</p>
          <p className="text-white">Village: {user.village}</p>
          <p className="text-white">Pincode: {user.pincode}</p>
        </div>

        {/* Account Information */}
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
          <h3 className="text-lg text-white font-semibold text-gray-700 mb-2">
            Account Information
          </h3>
          <p className="text-white">Username: {user.username}</p>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;

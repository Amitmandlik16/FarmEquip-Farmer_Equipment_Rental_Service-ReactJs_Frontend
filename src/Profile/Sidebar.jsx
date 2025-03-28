import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaUser,
  FaClipboardList,
  FaTools,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Sidebar = ({ setActiveTab }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userToken");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div>
      {/* Mobile Toggle Button */}
      <div className="md:hidden fixed top-3 left-1 z-50 mt-13">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-white bg-gray-800 p-2 rounded-full focus:outline-none shadow-md"
        >
          {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-72 h-full bg-gray-900 text-white p-6 shadow-lg transform transition-transform duration-300 z-40 
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:relative md:block`}
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Dashboard</h2>
        <ul className="space-y-3">
          <li
            className="flex items-center p-3 rounded-lg hover:bg-gray-700 cursor-pointer"
            onClick={() => {
              setActiveTab("profile");
              setIsSidebarOpen(false);
            }}
          >
            <FaUser className="mr-3" /> My Profile
          </li>
          <li
            className="flex items-center p-3 rounded-lg hover:bg-gray-700 cursor-pointer"
            onClick={() => {
              setActiveTab("myrentals");
              setIsSidebarOpen(false);
            }}
          >
            <FaClipboardList className="mr-3" /> My Rentals
          </li>
          <li
            className="flex items-center p-3 rounded-lg hover:bg-gray-700 cursor-pointer"
            onClick={() => {
              setActiveTab("myequipment");
              setIsSidebarOpen(false);
            }}
          >
            <FaTools className="mr-3" /> My Equipment
          </li>
          <li
            className="flex items-center p-3 rounded-lg hover:bg-gray-700 cursor-pointer"
            onClick={() => {
              setActiveTab("farmerrequests");
              setIsSidebarOpen(false);
            }}
          >
            <FaTools className="mr-3" /> Requests
          </li>
          <li
            className="flex items-center p-3 rounded-lg hover:bg-gray-700 cursor-pointer"
            onClick={() => {
              setActiveTab("emailinvite");
              setIsSidebarOpen(false);
            }}
          >
            <MdEmail className="mr-3" /> Invite Others
          </li>
          <li
            className="flex items-center p-3 rounded-lg hover:bg-gray-700 cursor-pointer"
            onClick={() => {
              setActiveTab("laborrequests");
              setIsSidebarOpen(false);
            }}
          >
            <MdEmail className="mr-3" /> Labor Requests
          </li>
          <li
            className="flex items-center p-3 rounded-lg hover:bg-gray-700 cursor-pointer"
            onClick={() => {
              setActiveTab("settings");
              setIsSidebarOpen(false);
            }}
          >
            <FaCog className="mr-3" /> Settings
          </li>
          {isLoggedIn ? (
            <li
              className="flex items-center p-3 rounded-lg bg-red-600 hover:bg-red-700 cursor-pointer mt-6"
              onClick={() => {
                handleLogout();
                setIsSidebarOpen(false);
              }}
            >
              <FaSignOutAlt className="mr-3" /> Logout
            </li>
          ) : (
            <li
              className="flex items-center p-3 rounded-lg hover:bg-gray-700 cursor-pointer mt-6"
              onClick={() => {
                navigate("/login");
                setIsSidebarOpen(false);
              }}
            >
              <FaSignOutAlt className="mr-3" /> Login
            </li>
          )}
        </ul>
      </div>

      {/* Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;

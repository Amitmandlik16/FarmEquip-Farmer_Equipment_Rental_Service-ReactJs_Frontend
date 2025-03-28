import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FiUsers,
  FiTool,
  FiMail,
  FiLogOut,
  FiHome,
  FiMessageCircle,
} from "react-icons/fi";
import { FaBars, FaTimes } from "react-icons/fa";
import { MdFeedback } from "react-icons/md";
import { FaImages } from "react-icons/fa6";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("adminToken"); // Clear stored admin session
    navigate("/login"); // Redirect to login page
  };

  return (
    <div>
      {/* Mobile Menu Button */}
      <div className="md:hidden relative z-20 p-4">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-white bg-gray-100 dark:bg-gray-800 p-2 rounded-md focus:outline-none"
        >
          {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={` absolute top-[60px] md:top-0 left-0 w-64 bg-gray-800 text-white h-full p-4 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform md:translate-x-0 md:relative md:block z-10`}
      >
        <h2 className="text-2xl font-bold text-center mb-6">Admin Panel</h2>

        <nav className="flex-1">
          <ul className="space-y-4">
            <li>
              <Link
                to="/dashboard"
                className="flex items-center p-2 rounded hover:bg-gray-700"
                onClick={() => setIsSidebarOpen(false)}
              >
                <FiHome className="mr-2" /> Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/UserManagement"
                className="flex items-center p-2 rounded hover:bg-gray-700"
                onClick={() => setIsSidebarOpen(false)}
              >
                <FiUsers className="mr-2" /> User Management
              </Link>
            </li>
            <li>
              <Link
                to="/LaborManagement"
                className="flex items-center p-2 rounded hover:bg-gray-700"
                onClick={() => setIsSidebarOpen(false)}
              >
                <FiUsers className="mr-2" /> Labor Management
              </Link>
            </li>
            <li>
              <Link
                to="/EquipmentListing"
                className="flex items-center p-2 rounded hover:bg-gray-700"
                onClick={() => setIsSidebarOpen(false)}
              >
                <FiTool className="mr-2" /> Equipment Listings
              </Link>
            </li>
            <li>
              <Link
                to="/AdminFeedback"
                className="flex items-center p-2 rounded hover:bg-gray-700"
                onClick={() => setIsSidebarOpen(false)}
              >
                <FiMessageCircle className="mr-2" /> Feedback & Reviews
              </Link>
            </li>
            <li>
              <Link
                to="/AdminComplaints"
                className="flex items-center p-2 rounded hover:bg-gray-700"
                onClick={() => setIsSidebarOpen(false)}
              >
                <MdFeedback className="mr-2" /> Complaints
              </Link>
            </li>
            <li>
              <Link
                to="/AdminPosts"
                className="flex items-center p-2 rounded hover:bg-gray-700"
                onClick={() => setIsSidebarOpen(false)}
              >
                <FaImages className="mr-2" /> Posts
              </Link>
            </li>
          </ul>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-60 flex items-center p-2 rounded bg-red-600 hover:bg-red-700 w-full"
        >
          <FiLogOut className="mr-2" /> Logout
        </button>
      </div>

      {/* Overlay for Mobile (Closes Sidebar when clicked) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default AdminSidebar;

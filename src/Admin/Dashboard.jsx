import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  FaUsers,
  FaTractor,
  FaShoppingCart,
  FaMoneyBillWave,
} from "react-icons/fa";
import AdminSidebar from "./AdminSidebar";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalFarmers: 0,
    totalEquipment: 0,
    totalBookings: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    // Simulated API call to fetch dashboard stats
    const fetchStats = async () => {
      // Replace with real API calls
      const response = {
        totalFarmers: 120,
        totalEquipment: 85,
        totalBookings: 340,
      };
      setStats(response);
    };
    fetchStats();
  }, []);

  const data = [
    { name: "Jan", bookings: 40 },
    { name: "Feb", bookings: 55 },
    { name: "Mar", bookings: 75 },
    { name: "Apr", bookings: 100 },
    { name: "May", bookings: 90 },
  ];

  return (
    <div className="flex">
      <AdminSidebar setActiveTab={() => {}} />{" "}
      {/* Include the Sidebar component */}
      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        <h2 className="text-3xl font-bold text-green-700 mb-6">
          Admin Dashboard
        </h2>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
            <FaUsers className="text-green-600 text-3xl" />
            <div>
              <p className="text-gray-600">Total Farmers</p>
              <h3 className="text-2xl font-bold">{stats.totalFarmers}</h3>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
            <FaTractor className="text-green-600 text-3xl" />
            <div>
              <p className="text-gray-600">Total Equipment</p>
              <h3 className="text-2xl font-bold">{stats.totalEquipment}</h3>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
            <FaShoppingCart className="text-green-600 text-3xl" />
            <div>
              <p className="text-gray-600">Total Bookings</p>
              <h3 className="text-2xl font-bold">{stats.totalBookings}</h3>
            </div>
          </div>
        </div>

        {/* Booking Trends Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Booking Trends
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="bookings" fill="#34D399" barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

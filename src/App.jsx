import { useState } from "react";
import Navbar from "./Components/Navbar";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./Login/Login";
import Home from "./Home/Home";
import Footer from "./Components/Footer";
import AdminLogin from "./Admin/AdminLogin";
import Signup from "./Login/Signup";
import Profile from "./Profile/Profile";
import Feedback from "./Home/Feedback";
import ForgotPassword from "./Login/ForgotPassword";
import Dashboard from "./Admin/Dashboard";
import EmailInvite from "./Profile/EmailInvite";
import UserManagement from "./Admin/UserManagement";
import AdminFeedback from "./Admin/AdminFeedback";
import BookEquipment from "./Equipment/BookEquipment";
import RegisterEquipment from "./Equipment/RegisterEquipment";
import Complain from "./Equipment/Complain";
import AdminComplaints from "./Admin/AdminComplaints";
import EquipmentListing from "./Admin/EquipmentListing";
import FarmGram from "./FarmGram/FarmGram";
import AdminPosts from "./Admin/AdminPosts";
import MyEquipment from "./Profile/MyEquipment";
import Roleselection from "./Home/RoleSelection";
import RentEquipment from "./Equipment/RentEquipment";
import SearchLabor from "./Labor/SearchLabor";
import Rentals from "./Profile/Rentals";
import GetRecommendation from "./Equipment/GetReccomendation";
import ChatButton from "./ChatBot/ChatButton";
import LaborProfile from "./Labor/LaborProfile";
import VoiceAssistant from "./Components/VoiceAssistant";
import LaborRegister from "./Labor/LaborRegister";
import LaborManagement from "./Admin/LaborManagement";
import LaborRequests from "./Labor/LaborRequests";
function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/adminlogin" element={<AdminLogin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/emailinvite" element={<EmailInvite />} />
            <Route path="/usermanagement" element={<UserManagement />} />
            <Route path="/adminfeedback" element={<AdminFeedback />} />
            <Route path="/BookEquipment" element={<BookEquipment />} />
            <Route path="/RegisterEquipment" element={<RegisterEquipment />} />
            <Route path="/Complain" element={<Complain />} />
            <Route path="/AdminComplaints" element={<AdminComplaints />} />
            <Route path="/EquipmentListing" element={<EquipmentListing />} />
            <Route path="/FarmGram" element={<FarmGram />} />
            <Route path="/AdminPosts" element={<AdminPosts />} />
            <Route path="/MyEquipment " element={<MyEquipment />} />
            <Route path="/Roleselection " element={<Roleselection />} />
            <Route path="/RentEquipment" element={<RentEquipment />} />
            <Route path="/SearchLabor" element={<SearchLabor />} />
            <Route path="/Rentals" element={<Rentals />} />
            <Route path="/getreccomend" element={<GetRecommendation />} />
            <Route path="/laborprofile" element={<LaborProfile />} />
            <Route path="/LaborRegister" element={<LaborRegister />} />
            <Route path="/LaborManagement" element={<LaborManagement />} />
            <Route path="/laborrequests" element={<LaborRequests />} />
          </Routes>
        </main>
      </div>
      <VoiceAssistant />
      <ChatButton />
      <Footer />
    </BrowserRouter>
  );
}

export default App;

import { useState } from "react";
import Sidebar from "./Sidebar";
import MyProfile from "./MyProfile";
import Settings from "./Settings";
import EmailInvite from "./EmailInvite";
import FarmerRequests from "./FarmerRequests";
import Rentals from "./Rentals";
import MyEquipment from "./MyEquipment";
import LaborRequests from "../Labor/LaborRequests";
const ProfileContent = ({ activeTab }) => {
  return (
    <div className="flex-1 p-6">
      {activeTab === "profile" && (
        <div>
          <MyProfile />
        </div>
      )}
      {activeTab === "myrentals" && (
        <div>
          <Rentals />
        </div>
      )}
      {activeTab === "myequipment" && (
        <div>
          <MyEquipment />
        </div>
      )}
      {activeTab === "emailinvite" && (
        <div>
          <EmailInvite />
        </div>
      )}
      {activeTab === "farmerrequests" && (
        <div>
          <FarmerRequests />
        </div>
      )}
      {activeTab === "laborrequests" && (
        <div>
          <LaborRequests />
        </div>
      )}
      {activeTab === "settings" && (
        <div>
          <Settings />
        </div>
      )}
    </div>
  );
};

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="flex min-h-screen">
      <Sidebar setActiveTab={setActiveTab} />
      <ProfileContent activeTab={activeTab} />
    </div>
  );
};

export default Profile;

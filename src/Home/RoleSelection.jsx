import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const RoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState(null); // Track the selected role
  const navigate = useNavigate();

  // Handle role selection and navigation
  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    // Navigate to the signup page and pass the selected role as state
    navigate("/signup", { state: { role } });
  };
  const { t, i18n } = useTranslation();

  return (
    <section className="text-green-100 dark:text-gray-800 py-16 px-6 flex flex-col items-center text-center">
      <motion.h2
        className="text-3xl sm:text-4xl font-bold"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {t("title")}
      </motion.h2>
      <motion.p
        className="mt-4 text-lg max-w-2xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {t("description")}
      </motion.p>
      <motion.h2
        className="text-3xl sm:text-3xl "
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {t("role_prompt")}
      </motion.h2>
      {/* Buttons */}
      <div className="flex flex-row gap-4">
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link
            to="/signup"
            className="bg-green-700  text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 rounded border border-green-700 transition-all duration-300 hover:bg-white hover:text-green-700"
          >
            {t("farmer")}
          </Link>
        </motion.div>
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link
            to="/LaborRegister"
            className="bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 rounded border border-green-700 transition-all duration-300 hover:bg-white hover:text-green-700"
          >
            {t("laborer")}
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default RoleSelection;

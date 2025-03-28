import { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({ username: "", email: "" });
  const [message, setMessage] = useState("");
  const { t } = useTranslation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post(
        "https://famerequipmentrental-springboot-production.up.railway.app/farmer/forgot-password",
        formData
      );
      if (response.status === 200) {
        setMessage("A temporary password has been sent to your email.");
      }
    } catch (error) {
      setMessage("Failed to process request. Please check your details.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-green-700 dark:text-white text-center mb-4">
          {t("title3")}
        </h2>

        {message && (
          <p className="text-center text-red-500 dark:text-red-400 mb-4">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium">
              {t("username")}
            </label>
            <input
              type="text"
              name="username"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-700 dark:text-white"
              placeholder={t("placeholderUsername")}
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium">
              {t("email")}
            </label>
            <input
              type="email"
              name="email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-700 dark:text-white"
              placeholder={t("placeholderEmail")}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          >
            {t("submit")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

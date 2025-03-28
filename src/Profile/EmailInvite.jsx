import { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

const EmailInvite = () => {
  const [formData, setFormData] = useState({
    invitedName: "",
    invitedEmail: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { t } = useTranslation();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleInvite = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        "https://famerequipmentrental-springboot-production.up.railway.app/farmer/invitemail",
        { ...formData, id: user.id }
      );

      if (response.status === 200) {
        setMessage(t("invitationSent"));
        setFormData({ invitedName: "", invitedEmail: "" });
      } else {
        setMessage(t("invitationFailed"));
      }
    } catch (error) {
      console.error("Error sending invite:", error);
      setMessage(t("errorOccurred"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-gray-800 text-white p-8 rounded-lg shadow-md max-w-lg w-full mx-auto border border-gray-700">
          <h2 className="text-2xl font-bold text-center mb-4">
            {t("inviteOthers")}
          </h2>
          {message && (
            <p className="text-center mb-4 text-green-600 font-semibold">
              {message}
            </p>
          )}

          <form onSubmit={handleInvite} className="flex flex-col gap-4">
            <div>
              <label className="block text-gray-300 font-semibold">
                {t("name")}
              </label>
              <input
                type="text"
                name="invitedName"
                className="w-full px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 bg-gray-700 text-white"
                placeholder={t("enterName")}
                value={formData.invitedName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 font-semibold">
                {t("email")}
              </label>
              <input
                type="email"
                name="invitedEmail"
                className="w-full px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 bg-gray-700 text-white"
                placeholder={t("enterEmail")}
                value={formData.invitedEmail}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition font-semibold disabled:opacity-50"
              disabled={loading}
            >
              {loading ? t("sending") : t("sendInvitation")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmailInvite;

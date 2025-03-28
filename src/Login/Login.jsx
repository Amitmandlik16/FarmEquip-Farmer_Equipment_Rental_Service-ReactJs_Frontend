import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FaRegEyeSlash, FaEye } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [selected, setSelected] = useState("farmer"); // Default role is "farmer"
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const endpoint =
        selected === "farmer"
          ? "https://famerequipmentrental-springboot-production.up.railway.app/farmer/login"
          : "https://famerequipmentrental-springboot-production.up.railway.app/labor/login";

      const response =
        selected === "farmer"
          ? await axios.post(endpoint, { username, password })
          : await axios.post(endpoint, { email, password });

      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("userToken", response.data.token);
        localStorage.setItem("role", selected);

        navigate(selected === "farmer" ? "/" : "/LaborProfile");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center text-green-700 dark:text-white">
          {t("title2")}
        </h2>
        <div className="flex justify-center gap-2 mt-6">
          <button
            className={`px-6 py-2 font-medium rounded-lg transition-all ${
              selected === "farmer"
                ? "bg-green-600 text-white"
                : "bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white"
            }`}
            onClick={() => setSelected("farmer")}
          >
            {t("roleSelection.farmer")}
          </button>
          <button
            className={`px-6 py-2 font-medium rounded-lg transition-all ${
              selected === "laborer"
                ? "bg-green-600 text-white"
                : "bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white"
            }`}
            onClick={() => setSelected("laborer")}
          >
            {t("roleSelection.laborer")}
          </button>
        </div>
        <p className="text-center text-gray-700 dark:text-white mt-4">
          {selected === "farmer" ? t("farmerLogin") : t("laborerLogin")}
        </p>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        <form onSubmit={handleLogin} className="mt-4">
          {selected === "farmer" ? (
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-700 dark:text-white mb-4"
              placeholder={t("placeholder.username")}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          ) : (
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-700 dark:text-white mb-4"
              placeholder={t("placeholder.email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          )}
          <div className="relative">
            <input
              type={isPasswordVisible ? "text" : "password"}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 pr-10 dark:bg-gray-700 dark:text-white mb-4"
              placeholder={t("placeholder.password")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-300"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              {isPasswordVisible ? (
                <FaEye size={18} />
              ) : (
                <FaRegEyeSlash size={18} />
              )}
            </button>
          </div>
          <Link
            to="/forgotpassword"
            className="text-green-600 hover:underline text-sm block text-right mb-4"
          >
            {t("forgotPassword")}
          </Link>
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg transition-all ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? t("loading") : t("loginButton")}
          </button>
        </form>
        <p className="text-center text-gray-600 dark:text-gray-300 mt-4">
          {t("noAccount")}{" "}
          <Link to="/signup" className="text-green-600 hover:underline">
            {t("signup")}
          </Link>
        </p>
        <p className="text-center text-gray-600 dark:text-gray-300 mt-2">
          {t("adminLogin")}{" "}
          <Link to="/adminlogin" className="text-green-600 hover:underline">
            {t("login")}
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;

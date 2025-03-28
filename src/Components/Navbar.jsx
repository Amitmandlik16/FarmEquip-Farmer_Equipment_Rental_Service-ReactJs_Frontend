import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaUser, FaGlobe } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("userToken")
  );
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("userToken"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsLanguageOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold">
          <Link to="/">FarmRent</Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          <li className="relative">
            <button
              className="hover:underline"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {t("equipment")}
            </button>
            {isDropdownOpen && (
              <ul className="absolute bg-white border mt-2 rounded shadow-lg">
                <li>
                  <Link
                    to="/bookequipment"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    {t("book_equipment")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/registerequipment"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    {t("register_equipment")}
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link to="/searchlabor" className="hover:underline">
              {t("laborer")}
            </Link>
          </li>
          <li>
            <Link to="/getreccomend" className="hover:underline">
              {t("recommendation")}
            </Link>
          </li>
          <li>
            <Link to="/FarmGram" className="hover:underline">
              {t("farmgram")}
            </Link>
          </li>
        </ul>

        {/* Right Section */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative">
            <button
              className="px-3 py-2"
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
            >
              <FaGlobe size={22} />
            </button>
            {isLanguageOpen && (
              <div className="absolute top-10 bg-white border rounded shadow-lg">
                <button
                  className="block w-full px-4 py-2 hover:bg-gray-100"
                  onClick={() => changeLanguage("en")}
                >
                  English
                </button>
                <button
                  className="block w-full px-4 py-2 hover:bg-gray-100"
                  onClick={() => changeLanguage("mr")}
                >
                  {t("marathi")}
                </button>
              </div>
            )}
          </div>
          {isLoggedIn ? (
            <Link to="/profile" className="px-6 py-2">
              <FaUser size={22} />
            </Link>
          ) : (
            <Link
              to="/login"
              className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-600"
            >
              Login/Signup
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white p-4 w-full shadow-lg">
          <ul className="space-y-4">
            <li>
              <Link to="/searchlabor" onClick={() => setIsOpen(false)}>
                {t("laborer")}
              </Link>
            </li>
            <li>
              <Link to="/getreccomend" onClick={() => setIsOpen(false)}>
                {t("recommendation")}
              </Link>
            </li>
            <li>
              <Link to="/FarmGram" onClick={() => setIsOpen(false)}>
                {t("farmgram")}
              </Link>
            </li>

            {/* Language Switcher */}
            <li>
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="w-full text-left px-4 py-2 border rounded"
              >
                {t("language")}
              </button>
              {isLanguageOpen && (
                <ul className="bg-white border rounded shadow-lg">
                  <li>
                    <button
                      onClick={() => changeLanguage("en")}
                      className="block w-full px-4 py-2 hover:bg-gray-100"
                    >
                      English
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => changeLanguage("mr")}
                      className="block w-full px-4 py-2 hover:bg-gray-100"
                    >
                      {t("marathi")}
                    </button>
                  </li>
                </ul>
              )}
            </li>

            {/* Profile or Login */}
            <li>
              {isLoggedIn ? (
                <Link
                  to="/profile"
                  className="block text-center py-2 border rounded"
                >
                  Profile
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="block text-center py-2 bg-green-700 text-white rounded hover:bg-green-600"
                >
                  Login/Signup
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

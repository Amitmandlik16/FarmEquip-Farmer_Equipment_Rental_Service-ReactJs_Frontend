import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-green-200 dark:bg-gray-800 text-gray-300 py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Logo & Description */}
        <div className="text-center md:text-left mb-6 md:mb-0">
          <h2 className="text-2xl font-bold text-white">FarmRent</h2>
          <p className="mt-2 text-sm">
            Smart solutions for renting and listing farming equipment.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6 text-sm">
          <Link to="/about" className="hover:text-white transition">
            About
          </Link>
          <Link to="/catalog" className="hover:text-white transition">
            Catalog
          </Link>
          <Link to="/support" className="hover:text-white transition">
            Support
          </Link>
          <Link to="/contact" className="hover:text-white transition">
            Contact
          </Link>
          <Link to="/feedback" className="hover:text-white transition">
            Give Feedback
          </Link>
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-4 mt-6 md:mt-0">
          <a href="#" className="hover:text-white transition">
            <FaFacebook size={20} />
          </a>
          <a href="#" className="hover:text-white transition">
            <FaTwitter size={20} />
          </a>
          <a href="#" className="hover:text-white transition">
            <FaInstagram size={20} />
          </a>
          <a href="#" className="hover:text-white transition">
            <FaLinkedin size={20} />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-6 text-sm border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} FarmRent. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

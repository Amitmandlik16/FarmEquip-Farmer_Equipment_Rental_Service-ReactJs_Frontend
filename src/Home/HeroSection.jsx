import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import tractor1 from "../assets/tractor1.jpeg";
import tractor2 from "../assets/tractor2.jpeg";
import tractor3 from "../assets/tractor3.jpeg";
import tractor4 from "../assets/tractor4.jpg";
import tractor5 from "../assets/tractor5.jpg";
import cultivator from "../assets/cultivator.jpeg";
import transplanter from "../assets/transplanter.jpeg";
import combine from "../assets/combine.jpeg";
import tractor from "../assets/tractor.png";
import sprinkle from "../assets/sprinkle.png";
import broadcast from "../assets/broadcast.png";
import { useTranslation } from "react-i18next";

const images = [tractor4, tractor3, tractor5];

const equipmentList = [
  { image: cultivator, name: "Cultivator" },
  { image: transplanter, name: "Transplanter" },
  { image: combine, name: "Combine Harvester" },
  { image: tractor, name: "Tractor" },
  { image: sprinkle, name: "Sprinkles" },
  { image: broadcast, name: "Broadcaster Seeder" },
];
const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const { t } = useTranslation();
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => {
      clearInterval(interval),
        window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-center h-screen">
      {/* Carousel Wrapper */}
      <div className="relative w-[90%] sm:w-[80%] h-[450px] overflow-hidden rounded-4xl shadow-lg mt-15">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index + 1}`}
            className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Navigation Arrows */}
        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white text-gray-800 p-2 rounded-full shadow-md z-20"
          onClick={prevSlide}
        >
          <FaArrowLeft size={20} />
        </button>
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-gray-800 p-2 rounded-full shadow-md z-20"
          onClick={nextSlide}
        >
          <FaArrowRight size={20} />
        </button>
      </div>
      <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-gray-800">
        {t("rent_equipment")}
      </h2>
      {/* Small Equipment Boxes */}
      {!isMobile && (
        <div className="flex flex-wrap justify-center gap-4 mt-3 w-[90%]">
          {equipmentList.map((item, index) => (
            <div
              key={index}
              className="w-32 h-2 sm:w-36 sm:h-35 bg-white border-[2px] border-black shadow-md rounded-lg flex flex-col items-center p-1 transform transition-all hover:scale-105"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-24 object-cover rounded-md"
              />
              <p className="mt-2 text-sm font-semibold text-gray-700 text-center">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Text Content - Moved to Right Side */}
      {/* Text Content */}
      <div
        className={`absolute transform -translate-y-1/2 ${
          isMobile
            ? "top-1/2 left-1/2 -translate-x-1/2 w-[90%] text-center"
            : "top-55 right-55 w-[50%] text-right"
        }`}
      >
        <motion.h1
          className={`font-bold ${
            isMobile
              ? "text-2xl text-green-100 dark:text-gray-800"
              : "text-3xl sm:text-4xl text-green-100 dark:text-gray-800"
          }`}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {t("smart_farming")}{" "}
          <span className={`${isMobile ? "text-green-700" : "text-green-700"}`}>
            {t("simplified_rentals")}
          </span>
        </motion.h1>

        <motion.p
          className={`mt-3 ${
            isMobile
              ? "text-sm text-green-100 dark:text-gray-800 mx-auto max-w-xs"
              : "text-lg text-green-100 dark:text-gray-800 max-w-lg ml-auto"
          }`}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {t("hero_description")}
        </motion.p>

        {/* Buttons */}
        <motion.div
          className={`mt-5 flex flex-col space-y-3 ${
            isMobile
              ? "items-center"
              : "sm:flex-row sm:space-x-4 sm:space-y-0 justify-end"
          }`}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link
            to="/bookequipment"
            className={`${
              isMobile ? "w-64 text-center" : ""
            } bg-green-700 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105`}
          >
            {t("browse_equipment")}
          </Link>
          <Link
            to="/signup"
            className={`${
              isMobile ? "w-64 text-center" : ""
            } bg-gray-100 text-green-700 px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105`}
          >
            {t("get_started")}
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

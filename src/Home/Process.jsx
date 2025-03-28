import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FaSearch, FaCheck, FaTruck, FaList } from "react-icons/fa";
import { MdPayment, MdOutlineKeyboardReturn } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";

const Process = () => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState("renter");

  const renterSteps = [
    {
      icon: <FaSearch size={30} />,
      text: t("renterSteps.0.text"),
      subtext: t("renterSteps.0.subtext"),
    },
    {
      icon: <FaCheck size={30} />,
      text: t("renterSteps.1.text"),
      subtext: t("renterSteps.1.subtext"),
    },
    {
      icon: <MdPayment size={30} />,
      text: t("renterSteps.2.text"),
      subtext: t("renterSteps.2.subtext"),
    },
    {
      icon: <FaTruck size={30} />,
      text: t("renterSteps.3.text"),
      subtext: t("renterSteps.3.subtext"),
    },
    {
      icon: <MdOutlineKeyboardReturn size={30} />,
      text: t("renterSteps.4.text"),
      subtext: t("renterSteps.4.subtext"),
    },
  ];

  const supplierSteps = [
    {
      icon: <FaList size={30} />,
      text: t("supplierSteps.0.text"),
      subtext: t("supplierSteps.0.subtext"),
    },
    {
      icon: <FaCheck size={30} />,
      text: t("supplierSteps.1.text"),
      subtext: t("supplierSteps.1.subtext"),
    },
    {
      icon: <MdPayment size={30} />,
      text: t("supplierSteps.2.text"),
      subtext: t("supplierSteps.2.subtext"),
    },
    {
      icon: <FaTruck size={30} />,
      text: t("supplierSteps.3.text"),
      subtext: t("supplierSteps.3.subtext"),
    },
    {
      icon: <GiReceiveMoney size={30} />,
      text: t("supplierSteps.4.text"),
      subtext: t("supplierSteps.4.subtext"),
    },
  ];

  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 dark:text-white">
          {t("howItWorks")}
        </h2>

        {/* Tab Buttons */}
        <div className="flex justify-center gap-2 mt-6">
          <button
            className={`px-6 py-2 font-medium rounded-lg transition-all ${
              selected === "renter"
                ? "bg-green-600 text-white"
                : "bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white"
            }`}
            onClick={() => setSelected("renter")}
          >
            {t("renter")}
          </button>
          <button
            className={`px-6 py-2 font-medium rounded-lg transition-all ${
              selected === "supplier"
                ? "bg-green-600 text-white"
                : "bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white"
            }`}
            onClick={() => setSelected("supplier")}
          >
            {t("supplier")}
          </button>
        </div>

        {/* Process Steps */}
        <motion.div
          key={selected}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8 p-6 rounded-lg flex justify-center items-center"
        >
          <div className="flex flex-wrap justify-center gap-8 max-w-5xl">
            {(selected === "renter" ? renterSteps : supplierSteps).map(
              (step, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center bg-gray-200 dark:bg-gray-700 p-6 rounded-lg shadow-md w-40 sm:w-48 text-center transition-all transform hover:scale-105"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="text-green-600">{step.icon}</div>
                  <span className="text-gray-700 dark:text-white mt-3 font-medium">
                    {step.text}
                  </span>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                    {step.subtext}
                  </p>
                </motion.div>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Process;

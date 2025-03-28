import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  FaTractor,
  FaShieldAlt,
  FaMapMarkerAlt,
  FaLanguage,
  FaClock,
  FaComments,
} from "react-icons/fa";

const KeyFeatures = () => {
  const { t } = useTranslation();
  const features = [
    {
      icon: (
        <FaTractor className="text-green-100 dark:text-gray-800 text-5xl" />
      ),
      title: t("features.0.title"),
      description: t("features.0.description"),
    },
    {
      icon: (
        <FaShieldAlt className="text-green-100 dark:text-gray-800 text-5xl" />
      ),
      title: t("features.1.title"),
      description: t("features.1.description"),
    },
    {
      icon: <FaClock className="text-green-100 dark:text-gray-800 text-5xl" />,
      title: t("features.2.title"),
      description: t("features.2.description"),
    },
    {
      icon: (
        <FaMapMarkerAlt className="text-green-100 dark:text-gray-800 text-5xl" />
      ),
      title: t("features.3.title"),
      description: t("features.3.description"),
    },
    {
      icon: (
        <FaLanguage className="text-green-100 dark:text-gray-800 text-5xl" />
      ),
      title: t("features.4.title"),
      description: t("features.4.description"),
    },
    {
      icon: (
        <FaComments className="text-green-100 dark:text-gray-800 text-5xl" />
      ),
      title: t("features.5.title"),
      description: t("features.5.description"),
    },
  ];

  return (
    <section className="bg-gray-50 py-20 px-6 sm:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-green-700 mb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t("heading")}
        </motion.h2>
        <p className="text-gray-700 max-w-2xl mx-auto mb-12">
          {t("description1")}
        </p>

        {/* Grid Layout for Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Icon */}
              <div className="mb-4">{feature.icon}</div>
              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              {/* Description */}
              <p className="text-gray-600 max-w-xs">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;

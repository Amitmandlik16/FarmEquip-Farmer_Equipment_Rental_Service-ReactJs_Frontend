import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="bg-gray-100  text-green-100 dark:text-gray-800 py-16 px-6 flex flex-col items-center text-center">
      <motion.h2
        className="text-3xl sm:text-4xl font-bold"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Start Renting or Listing Equipment Today!
      </motion.h2>
      <motion.p
        className="mt-4 text-lg max-w-2xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Whether you need equipment, have equipment to rent, or are looking to
        offer or find labor services, join us and make farming easier, more
        efficient, and cost-effective
      </motion.p>
      <motion.div
        className="mt-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <Link
          to="/signup"
          className="bg-green-600  text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 "
        >
          Sign Up Now
        </Link>
      </motion.div>
    </section>
  );
};

export default CallToAction;

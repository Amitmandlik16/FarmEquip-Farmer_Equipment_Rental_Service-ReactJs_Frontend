import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const { t, i18n } = useTranslation();
  const faqs = [
    {
      question: t("whatIs"),
      answer: t("whatIsAnswer"),
    },
    {
      question: t("howToRent"),
      answer: t("howToRentAnswer"),
    },
    {
      question: t("securityDeposit"),
      answer: t("securityDepositAnswer"),
    },
    {
      question: t("listEquipment"),
      answer: t("listEquipmentAnswer"),
    },
    {
      question: t("customerSupport"),
      answer: t("customerSupportAnswer"),
    },
  ];
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-6">
      <div className=" p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-center text-green-100 dark:text-gray-800 mb-6">
          {t("title1")}
        </h2>

        {faqs.map((faq, index) => (
          <div
            key={index}
            className="mb-4 border-b border-gray-300 dark:border-gray-600"
          >
            <button
              className="w-full flex justify-between items-center p-4 text-left text-lg font-semibold  focus:outline-none"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              {openIndex === index ? (
                <FaChevronUp className="text-green-500" />
              ) : (
                <FaChevronDown className="text-green-500" />
              )}
            </button>
            {openIndex === index && (
              <p className="p-4 text-green-100 dark:text-gray-800">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;

import React from "react";
import { motion } from "framer-motion";
import {
  FaRegClipboard,
  FaCalendarCheck,
  FaWallet,
  FaPlaneDeparture,
} from "react-icons/fa";
import { steps } from "../../../data";

const BookingGuideInstructions = () => {
  const iconMap = {
    FaRegClipboard: <FaRegClipboard className="text-blue-600 text-3xl" />,
    FaCalendarCheck: <FaCalendarCheck className="text-green-600 text-3xl" />,
    FaWallet: <FaWallet className="text-yellow-500 text-3xl" />,
    FaPlaneDeparture: <FaPlaneDeparture className="text-purple-600 text-3xl" />,
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const headingVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    hover: {
      y: -5,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 200,
        delay: 0.2,
      },
    },
    hover: {
      scale: 1.1,
      transition: { duration: 0.2 },
    },
  };

  return (
    <section className="bg-white dark:bg-[#0A2025] px-5 py-12 md:px-20">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-300 mb-10"
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Booking Guide
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition duration-300"
              variants={cardVariants}
              whileHover="hover"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div
                variants={iconVariants}
                whileHover="hover"
                className="mb-4"
              >
                {iconMap[step.icon]}
              </motion.div>

              <motion.h3
                className="text-lg font-semibold text-gray-900 dark:text-white mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                {step.title}
              </motion.h3>

              <motion.p
                className="text-sm text-gray-600 dark:text-gray-300"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                {step.description}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BookingGuideInstructions;

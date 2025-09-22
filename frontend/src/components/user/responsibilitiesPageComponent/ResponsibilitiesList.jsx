import React from "react";
import { motion } from "framer-motion";
import { tips } from "../../../data";
import {
  FaRecycle,
  FaUsers,
  FaCamera,
  FaHandHoldingHeart,
  FaFemale,
} from "react-icons/fa";

const ResponsibilitiesList = () => {
  const iconMap = {
    FaRecycle: <FaRecycle className="text-green-500 text-2xl md:text-3xl" />,
    FaUsers: <FaUsers className="text-indigo-500 text-2xl md:text-3xl" />,
    FaHandHoldingHeart: (
      <FaHandHoldingHeart className="text-pink-500 text-2xl md:text-3xl" />
    ),
    FaCamera: <FaCamera className="text-yellow-500 text-2xl md:text-3xl" />,
    FaFemale: <FaFemale className="text-red-500 text-2xl md:text-3xl" />,
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1],
        type: "spring",
        stiffness: 100,
        damping: 12,
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

  const cardHoverVariants = {
    hover: {
      y: -8,
      scale: 1.03,
      boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.1)",
      transition: {
        duration: 0.4,
        ease: "easeOut",
        type: "spring",
        stiffness: 300,
      },
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.2 },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.6,
        type: "spring",
        stiffness: 200,
        delay: 0.3,
      },
    },
    hover: {
      scale: 1.3,
      rotate: 15,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: 0.4,
      },
    },
  };

  return (
    <section className="bg-white dark:bg-[#0A2025] px-5 py-12 md:px-20">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-300 text-center mb-6"
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          How Can You Be a Responsible Tourist?
        </motion.h2>

        <motion.p
          className="text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12"
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          transition={{ delay: 0.3 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          Pakistan is developing as a tourist destination, and your actions as a
          visitor shape its future. Let's travel responsibly, leaving behind
          nothing but positive impact and meaningful memories.
        </motion.p>

        <motion.div
          className="grid gap-8 sm:grid-cols-1 md:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {tips.map((tip, index) => (
            <motion.div
              key={index}
              className="flex items-start gap-4 bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-lg transition-all cursor-pointer"
              variants={itemVariants}
              whileHover="hover"
              whileTap="tap"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={index}
            >
              <motion.div
                variants={iconVariants}
                whileHover="hover"
                className="flex-shrink-0"
              >
                {iconMap[tip.icon]}
              </motion.div>

              <motion.div variants={contentVariants}>
                <motion.h3
                  className="text-lg md:text-xl font-semibold text-gray-800 dark:text-white mb-2"
                  whileHover={{ color: "#1e40af" }}
                  transition={{ duration: 0.2 }}
                >
                  {tip.title}
                </motion.h3>
                <motion.p
                  className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {tip.description}
                </motion.p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ResponsibilitiesList;

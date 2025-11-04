import React from "react";
import { motion } from "framer-motion";
import { terms } from "../../../data";

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
  hover: {
    y: -5,
    scale: 1.02,
    boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.1)",
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.2 },
  },
};

const numberVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.6,
      type: "spring",
      stiffness: 200,
    },
  },
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: { duration: 0.2 },
  },
};

const contentVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      delay: 0.2,
    },
  },
};

const TermsConditionsComponent = () => {
  return (
    <section className="bg-white dark:bg-[#0A2025] px-6 py-12 md:px-20">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-300 text-center mb-10"
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          Terms & Conditions
        </motion.h2>

        <motion.div
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {terms.map((term, index) => (
            <motion.div
              key={index}
              className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl shadow hover:shadow-lg transition-all cursor-pointer border border-blue-100 dark:border-blue-800/30"
              variants={cardVariants}
              whileHover="hover"
              whileTap="tap"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="flex items-start gap-4">
                <motion.div
                  variants={numberVariants}
                  whileHover="hover"
                  className="flex-shrink-0"
                >
                  <span className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold text-sm">
                    {index + 1}
                  </span>
                </motion.div>

                <motion.div variants={contentVariants} className="flex-1">
                  <motion.h3
                    className="text-lg md:text-xl font-semibold text-blue-800 dark:text-blue-200 mb-3"
                    whileHover={{ color: "#1e40af" }}
                    transition={{ duration: 0.2 }}
                  >
                    {term.title}
                  </motion.h3>
                  <motion.p
                    className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    {term.description}
                  </motion.p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TermsConditionsComponent;

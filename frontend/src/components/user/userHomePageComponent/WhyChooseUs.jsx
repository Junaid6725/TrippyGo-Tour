import React from "react";
import WhyChooseCard from "./WhyChooseCard";
import { motion } from "framer-motion";

const WhyChooseUs = () => {
  
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
      className="py-16 px-6"
    >
      <div className="flex items-center justify-between px-4 py-2 mb-8">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900 relative w-fit">
          Why Choose <span className="text-blue-600">TrippyGo</span>
        </h1>
      </div>

      <motion.div
        className="mt-6 mx-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8"
        variants={containerVariants}
      >
        <WhyChooseCard />
      </motion.div>
    </motion.section>
  );
};

export default WhyChooseUs;

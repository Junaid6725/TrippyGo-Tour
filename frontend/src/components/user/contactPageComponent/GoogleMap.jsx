import React from "react";
import { motion } from "framer-motion";

const GoogleMap = () => {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const iframeVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.2,
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="w-full lg:w-2/3 bg-gray-300 rounded-lg overflow-hidden relative h-[300px] sm:h-[400px] md:h-auto md:w-2/4"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.iframe
        variants={iframeVariants}
        initial="hidden"
        whileInView="visible"
        title="map"
        className="absolute inset-0 w-full h-full"
        src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=%C4%B0zmir+(My%20Business%20Name)&ie=UTF8&t=&z=14&iwloc=B&output=embed"
        loading="lazy"
      />
    </motion.div>
  );
};

export default GoogleMap;

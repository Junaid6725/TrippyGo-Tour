import React from "react";
import { motion } from "framer-motion";
import { tourismGuide } from "../../../data";
import {
  MdOutlineFlight,
  MdOutlineHotel,
  MdOutlineRestaurant,
  MdOutlineMap,
  MdOutlineWifi,
  MdOutlineElectricBolt,
  MdOutlineWc,
  MdOutlineAltRoute,
  MdOutlineWbSunny,
  MdOutlineEventNote,
} from "react-icons/md";

// Map icons + colors
const iconMap = {
  MdOutlineFlight: { icon: MdOutlineFlight, color: "text-sky-500" },
  MdOutlineHotel: { icon: MdOutlineHotel, color: "text-green-500" },
  MdOutlineRestaurant: { icon: MdOutlineRestaurant, color: "text-orange-500" },
  MdOutlineMap: { icon: MdOutlineMap, color: "text-purple-500" },
  MdOutlineWifi: { icon: MdOutlineWifi, color: "text-blue-500" },
  MdOutlineElectricBolt: {
    icon: MdOutlineElectricBolt,
    color: "text-yellow-500",
  },
  MdOutlineWc: { icon: MdOutlineWc, color: "text-pink-500" },
  MdOutlineAltRoute: { icon: MdOutlineAltRoute, color: "text-red-500" },
  MdOutlineWbSunny: { icon: MdOutlineWbSunny, color: "text-amber-500" },
  MdOutlineEventNote: { icon: MdOutlineEventNote, color: "text-indigo-500" },
};

const TourismGuide = () => {
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

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: -30,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    hover: {
      x: 5,
      borderLeftColor: "#3b82f6",
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
      },
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: { duration: 0.2 },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.2,
      },
    },
  };

  return (
    <section className="bg-white dark:bg-[#0A2025] px-5 py-12 md:px-20">
      <div className="max-w-5xl mx-auto space-y-10">
        <motion.h2
          className="text-3xl font-bold text-blue-600 dark:text-blue-400 text-center mb-6"
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Travel Advisory
        </motion.h2>

        <motion.div
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {tourismGuide.map((item, index) => {
            const IconData = iconMap[item.icon];
            if (!IconData) return null;
            const Icon = IconData.icon;

            return (
              <motion.div
                key={index}
                className="flex items-start gap-5 border-l-4 border-blue-500 pl-4"
                variants={itemVariants}
                whileHover="hover"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {/* Icon */}
                <motion.div variants={iconVariants} whileHover="hover">
                  <Icon
                    className={`flex-shrink-0 ${IconData.color} text-3xl md:text-4xl mt-1`}
                  />
                </motion.div>

                {/* Text */}
                <motion.div variants={contentVariants}>
                  <h3 className="text-lg md:text-xl font-semibold text-[#0A2025] dark:text-white">
                    {item.heading}
                  </h3>
                  <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                    {item.text}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default TourismGuide;

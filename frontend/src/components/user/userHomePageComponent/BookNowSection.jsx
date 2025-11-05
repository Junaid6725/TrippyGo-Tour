import React from "react";
import { CiBookmark } from "react-icons/ci";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const BookNowSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      className="relative bg-gradient-to-r from-blue-50 via-white to-blue-50 overflow-hidden rounded-2xl shadow-lg w-full"
    >
      <div className="grid grid-cols-1 md:grid-cols-2">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center py-16 relative z-10"
        >
          <div className="text-center md:text-left px-6 md:px-10">
            <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Grab up to <span className="text-blue-600">35% off</span>
              <br />
              on your favorite <br />
              <span className="text-blue-800">Destination</span>
            </h1>
            <p className="text-gray-600 mt-4">
              Limited time offer, don’t miss the opportunity
            </p>

            <Link
              to="/tours"
              className="mt-6 inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition gap-2"
            >
             Book Now <CiBookmark className="text-2xl" />
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          <motion.img
            src="/banner-img.webp"
            alt="Hot air balloons"
            className="w-full h-64 md:h-full object-cover rounded-t-2xl md:rounded-tr-none md:rounded-r-2xl"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default BookNowSection;

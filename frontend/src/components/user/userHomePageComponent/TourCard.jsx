import React from "react";
import { CiStar } from "react-icons/ci";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const TourCard = ({ tour }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative bg-white rounded-xl shadow-md overflow-hidden transition-all duration-500 hover:shadow-2xl max-w-xs w-full mx-auto"
    >
      <div className="relative overflow-hidden h-48 sm:h-56 md:h-60 rounded-t-xl">
        <motion.img
          src={tour.tourImg}
          alt={tour.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="p-4 sm:p-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
              {tour.title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500">{tour.location}</p>
          </div>
          <div className="text-right">
            <p className="text-base sm:text-lg font-bold text-blue-600">
              ${tour.expenditure}
            </p>
          </div>
        </div>

        <div className="mt-3">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3, staggerChildren: 0.1 }}
              className="flex text-yellow-400 text-lg sm:text-xl"
            >
              {[...Array(5)].map((_, i) => (
                <motion.span
                  key={i}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <CiStar />
                </motion.span>
              ))}
            </motion.div>
            <span className="text-xs text-gray-500 ml-2 sm:text-sm">
              (256 reviews)
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-4"
          >
            <Link
              to={`/tours/${tour._id}`}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 sm:py-2.5 rounded-lg font-medium transition-all duration-300 text-sm sm:text-base flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              See More
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default TourCard;

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const DestinationCard = ({ item, index }) => {
  return (
    <Link to={`/tours/destination/${item._id}`} key={item._id}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ scale: 1.03, y: -4 }}
        className="group relative cursor-pointer"
      >
        {/* Image */}
        <div className="relative overflow-hidden rounded-xl mb-3 shadow-md hover:shadow-xl transition-all duration-300">
          <img
            src={item.destinationImg}
            alt={item.name}
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) =>
              (e.target.src = `https://picsum.photos/400/400?random=${item._id}`)
            }
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Content */}
        <div className="text-center">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 leading-tight">
            {item.name}
          </h3>
        </div>
      </motion.div>
    </Link>
  );
};

export default DestinationCard;

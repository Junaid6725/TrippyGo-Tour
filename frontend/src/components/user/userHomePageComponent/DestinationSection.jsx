import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import DestinationCard from "./DestinationsCard";
import { getDestinations } from "../../../services/destinationService";

const DestinationSection = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 4; // items per page — matches backend default

  // Fetch destinations with pagination
  const fetchDestinations = async () => {
    try {
      setLoading(true);
      const res = await getDestinations(page, limit);

      if (res.data && Array.isArray(res.data.destinations)) {
        setDestinations(res.data.destinations);
        setTotalPages(res.data.totalPages || 1);
      } else {
        setDestinations([]);
        setTotalPages(1);
      }
    } catch (err) {
      console.error("Error fetching destinations:", err);
      setDestinations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, [page]);

  // Skeleton loader for smooth UX
  const SkeletonLoader = () => (
    <section className="w-full py-12 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="h-12 bg-gray-200 rounded-lg w-64 mb-4 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-96 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(limit)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 h-56 rounded-2xl mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  if (loading) return <SkeletonLoader />;

  if (!destinations.length) {
    return (
      <section className="w-full py-16 px-4 bg-white text-center">
        <div className="max-w-2xl mx-auto">
          <div className="text-6xl mb-4">🌍</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            No Destinations Available
          </h3>
          <p className="text-gray-600 mb-6">
            We're working on adding amazing destinations for you to explore.
          </p>
          <button
            onClick={fetchDestinations}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-300"
          >
            Refresh
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-12 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 sm:mb-12">
          <div className="mb-6 lg:mb-0">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-2xl md:text-4xl font-bold text-gray-800"
            >
              Popular <span className="text-blue-600">Destinations</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-600 text-base sm:text-lg max-w-2xl mt-2 sm:mt-3"
            >
              Discover amazing places to visit around the world
            </motion.p>
          </div>

          <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.3 }}>
            <Link
              to="/destinations"
              className="group flex items-center gap-1 text-sm md:text-lg text-blue-600 hover:text-blue-800 font-medium cursor-pointer transition-all duration-300 relative"
            >
              See All
              <FaLongArrowAltRight className="transform transition-transform duration-300 group-hover:translate-x-1" />
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </motion.div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {destinations.map((item, index) => (
            <Link to={`/tours/destination/${item._id}`} key={item._id}>
              <DestinationCard key={item._id} item={item} index={index} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationSection;

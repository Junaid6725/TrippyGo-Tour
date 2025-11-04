import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const DestinationSection = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);

  // Fetch destinations from backend
  const fetchDestinations = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:8000/api/get-destinations",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.data && Array.isArray(res.data.destinations)) {
        setDestinations(res.data.destinations);
      } else {
        setDestinations([]);
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
  }, []);

  // Skeleton loader
  const SkeletonLoader = () => (
    <section className="w-full py-12 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="h-12 bg-gray-200 rounded-lg w-64 mb-4 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-96 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 h-48 xs:h-56 sm:h-64 rounded-2xl mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  if (loading) {
    return <SkeletonLoader />;
  }

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
              className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-3"
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

          <button className="text-blue-600 hover:text-blue-700 font-semibold text-base sm:text-lg transition-all duration-300 hover:underline whitespace-nowrap">
            See All Destinations →
          </button>
        </div>

        {/* Grid Layout with optimized heights */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-6">
          {destinations.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="group relative cursor-pointer"
            >
              {/* Image Container with responsive heights */}
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl mb-3 shadow-md hover:shadow-xl transition-all duration-300">
                <img
                  src={item.destinationImg}
                  alt={item.name}
                  className="w-full h-48 xs:h-56 sm:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) =>
                    (e.target.src = `https://picsum.photos/400/400?random=${item._id}`)
                  }
                />
                {/* Enhanced Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Optional: Add a subtle badge for premium destinations */}
                {item.isPremium && (
                  <div className="absolute top-3 left-3 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    Premium
                  </div>
                )}
              </div>

              {/* Destination Name with better typography */}
              <div className="text-center px-1 sm:px-2">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 leading-tight">
                  {item.name}
                </h3>
                {/* Optional: Add location/country */}
                {item.country && (
                  <p className="text-xs sm:text-sm text-gray-500 mt-1 line-clamp-1">
                    {item.country}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationSection;

import React, { useState, useEffect } from "react";
import {
  FaLongArrowAltRight,
  FaMapMarkerAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";

const DestinationSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [destinations, setDestinations] = useState([]);
  const [itemsPerSlide, setItemsPerSlide] = useState(1);
  const [loading, setLoading] = useState(true);

  // Fetch destinations from backend
  const fetchDestinations = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8000/api/get-tours");
      if (res.data && Array.isArray(res.data.tours)) {
        setDestinations(res.data.tours);
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

  // Responsive items per slide
  useEffect(() => {
    const updateItemsPerSlide = () => {
      const width = window.innerWidth;
      if (width >= 1280) setItemsPerSlide(4);
      else if (width >= 1024) setItemsPerSlide(3);
      else if (width >= 768) setItemsPerSlide(2);
      else setItemsPerSlide(1);
    };
    updateItemsPerSlide();
    window.addEventListener("resize", updateItemsPerSlide);
    return () => window.removeEventListener("resize", updateItemsPerSlide);
  }, []);

  const totalSlides = Math.ceil(destinations.length / itemsPerSlide);
  const nextSlide = () =>
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  const getTranslation = () => -currentIndex * 100;

  const groupedDestinations = [];
  for (let i = 0; i < destinations.length; i += itemsPerSlide) {
    groupedDestinations.push(destinations.slice(i, i + itemsPerSlide));
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  if (loading) {
    return (
      <section className="py-16 text-center">
        <p className="text-gray-600">Loading destinations...</p>
      </section>
    );
  }

  if (!destinations.length) {
    return (
      <section className="py-16 text-center">
        <p className="text-gray-600">No destinations available.</p>
      </section>
    );
  }

  return (
    <section className="w-full py-16 px-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12">
          <div className="mb-6 lg:mb-0">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">
              Trending <span className="text-blue-600">Destinations</span>
            </h2>
            <p className="text-gray-600 text-lg sm:text-xl max-w-2xl mt-3">
              Discover popular experiences curated for you.{" "}
              <span className="text-blue-500 font-medium">
                Explore amazing places with exclusive deals.
              </span>
            </p>
          </div>
          {destinations.length > itemsPerSlide && (
            <div className="flex gap-3">
              <button
                onClick={prevSlide}
                className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700"
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={nextSlide}
                className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700"
              >
                <FaChevronRight />
              </button>
            </div>
          )}
        </div>

        {/* Slider */}
        <div className="relative overflow-hidden rounded-3xl shadow-xl bg-white p-3">
          <motion.div
            className="flex"
            animate={{ x: `${getTranslation()}%` }}
            transition={{ type: "spring", stiffness: 100, damping: 25 }}
          >
            {groupedDestinations.map((group, idx) => (
              <div key={idx} className="flex-shrink-0 w-full flex gap-4">
                {group.map((item) => (
                  <motion.div
                    key={item._id}
                    className="flex-shrink-0 w-full"
                    style={{ width: `${100 / itemsPerSlide}%` }}
                    variants={itemVariants}
                  >
                    <div className="group relative rounded-2xl shadow-md overflow-hidden cursor-pointer">
                      <img
                        src={item.imgUrl}
                        alt={item.imgAlt || item.title}
                        className="w-full h-72 object-cover rounded-2xl"
                        onError={(e) =>
                          (e.target.src = `https://picsum.photos/400/300?random=${item._id}`)
                        }
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70 group-hover:opacity-90 transition-opacity"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <div className="flex items-center mb-1">
                          <FaMapMarkerAlt className="mr-2" />
                          {item.location}
                        </div>
                        <h3 className="text-xl font-bold">{item.title}</h3>
                        <p className="text-gray-200 text-sm">
                          {item.description}
                        </p>
                        <div className="mt-2">
                          <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-full flex items-center text-white">
                            <FaLongArrowAltRight className="ml-1" /> Explore
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Dots */}
        {totalSlides > 1 && (
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-3 w-3 rounded-full ${
                  idx === currentIndex ? "bg-blue-600" : "bg-gray-300"
                }`}
              ></button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default DestinationSection;

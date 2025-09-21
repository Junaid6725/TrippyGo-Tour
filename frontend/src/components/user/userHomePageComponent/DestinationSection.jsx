import React, { useState, useRef } from "react";
import {
  FaLongArrowAltRight,
  FaMapMarkerAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { motion } from "framer-motion";

const DestinationSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  const destinations = [
    {
      title: "Keni Golf",
      desc: "Everything you need for any course",
      img: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      location: "Pebble Beach, CA",
    },
    {
      title: "Keni Travel",
      desc: "Explore new horizons with us",
      img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80",
      location: "Santorini, Greece",
    },
    {
      title: "Keni Basketball",
      desc: "Styles made for your games",
      img: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1190&q=80",
      location: "Madison Square Garden",
    },
    {
      title: "Keni Trail Running",
      desc: "Everything you need for adventure",
      img: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80",
      location: "Swiss Alps",
    },
    {
      title: "Mountain Adventure",
      desc: "Climb the heights of beauty",
      img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      location: "Rocky Mountains",
    },
    {
      title: "Beach Paradise",
      desc: "Relax and enjoy the sun",
      img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80",
      location: "Maldives",
    },
    {
      title: "City Exploration",
      desc: "Discover urban wonders",
      img: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1164&q=80",
      location: "New York City",
    },
    {
      title: "Winter Sports",
      desc: "Thrills in the snow",
      img: "https://images.unsplash.com/photo-1549144744-2ca5c2d7b5e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      location: "Aspen, Colorado",
    },
  ];

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === destinations.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? destinations.length - 1 : prevIndex - 1
    );
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="w-full py-16 px-4 sm:px-6 lg:px-8 "
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 sm:mb-16 px-2">
          <div className="mb-6 sm:mb-0">
            <h2 className="text-2xl md:text-4xl  font-bold text-gray-900 relative w-fit mb-2">
              Trending Destinations
            </h2>
            <p className="text-gray-600 text-md md:text-lg max-w-xl mt-3">
              Discover the most popular experiences curated just for you
            </p>
          </div>

          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ x: 5 }}
              transition={{ duration: 0.3 }}
              className="hidden md:flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-lg cursor-pointer px-4 py-2 rounded-lg hover:bg-blue-100 transition-all duration-300"
            >
              <span className="relative">
                Explore All
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </span>
              <FaLongArrowAltRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>

            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevSlide}
                className="p-3 rounded-full bg-white shadow-md hover:bg-blue-100 text-blue-600 transition-colors"
              >
                <FaChevronLeft />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextSlide}
                className="p-3 rounded-full bg-white shadow-md hover:bg-blue-100 text-blue-600 transition-colors"
              >
                <FaChevronRight />
              </motion.button>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl p-2">
          <motion.div
            ref={sliderRef}
            variants={containerVariants}
            className="flex"
            animate={{ x: -currentIndex * 100 + "%" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            {destinations.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-3"
              >
                <motion.div
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.3 },
                  }}
                  className="cursor-pointer group relative overflow-hidden rounded-2xl"
                >
                  <div className="relative h-72 overflow-hidden rounded-2xl">
                    <motion.img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover rounded-2xl"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300 rounded-2xl"></div>

                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <div className="flex items-center mb-1">
                        <FaMapMarkerAlt className="text-blue-300 mr-2" />
                        <span className="text-sm text-blue-100">
                          {item.location}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-1 group-hover:text-blue-300 transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-200">{item.desc}</p>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        className="mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300"
                      >
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                          Explore Now
                          <FaLongArrowAltRight className="ml-2" />
                        </button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="flex justify-center mt-8">
          {destinations.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`mx-1 h-3 w-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-blue-600 scale-125" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        <div className="mt-12 flex justify-center md:hidden">
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition-colors duration-300">
            View More Destinations
            <FaLongArrowAltRight />
          </button>
        </div>
      </div>
    </motion.section>
  );
};

export default DestinationSection;

import { FaLongArrowAltRight } from "react-icons/fa";
import TourCard from "./TourCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function PopularTour() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTours = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/get-tours?page=1&limit=4`
      );
      setTours(response.data.tours || []);
    } catch (error) {
      console.error("Failed to fetch tours", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="px-4 md:px-10 py-10"
    >
      <div className="flex items-center justify-between">
        <motion.h1
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-2xl md:text-4xl font-bold text-gray-800"
        >
          Popular Tours
        </motion.h1>

        <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.3 }}>
          <Link
            to="/tours"
            className="group flex items-center gap-1 text-sm md:text-lg text-blue-600 hover:text-blue-800 font-medium cursor-pointer transition-all duration-300 relative"
          >
            See All
            <FaLongArrowAltRight className="transform transition-transform duration-300 group-hover:translate-x-1" />
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </motion.div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <motion.div
            className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          />
        </div>
      ) : (
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.2 },
            },
          }}
          className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {tours.length > 0 ? (
            tours.map((tour) => (
              <motion.div
                key={tour._id}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <TourCard tour={tour} />
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              🚫 No Tours Available
            </p>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

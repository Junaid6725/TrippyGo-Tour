import { FaMapMarkerAlt, FaSearch, FaUsers } from "react-icons/fa";
import { CiBookmarkMinus, CiBookmarkPlus } from "react-icons/ci";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import TourCard from "./../../components/user/userHomePageComponent/TourCard";
import api from "../../api/axios";
import { searchTour } from "../../services/tourService";

export default function TourSearchBar() {
  const { register, handleSubmit, reset } = useForm();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false); // ✅ track if search was made

  // Handle search
  const onSubmit = async (data) => {
    if (!data.location && !data.minPrice && !data.maxPrice && !data.groupSize) {
      setError("Please fill at least one field to search.");
      return;
    }
    try {
      setLoading(true);
      setError("");
      setSearched(true);
      setResults([]);

      const res = await searchTour(data);

      setResults(res?.tours || []);
    } catch (err) {
      console.error("Search failed:", err);
      setError(
        err.response?.data?.message ||
          "Something went wrong while searching tours."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 mb-6 px-4">
      {/* Search Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto bg-white shadow-xl rounded-3xl p-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-5 items-end border border-blue-100"
        >
          {/* Where */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4"
          >
            <div className="bg-blue-100 p-3 rounded-full mt-1">
              <FaMapMarkerAlt className="text-blue-600 text-xl" />
            </div>
            <div className="w-full">
              <label className="text-sm font-semibold text-blue-900 mb-1 block">
                Where
              </label>
              <input
                type="text"
                placeholder="Search destinations"
                {...register("location")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
              />
            </div>
          </motion.div>

          {/* Min Price */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-4"
          >
            <div className="bg-blue-100 p-3 rounded-full mt-1">
              <CiBookmarkMinus className="text-blue-600 text-xl" />
            </div>
            <div className="w-full">
              <label className="text-sm font-semibold text-blue-900 mb-1 block">
                Min Price
              </label>
              <input
                type="number"
                placeholder="e.g. 1000"
                {...register("minPrice")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
              />
            </div>
          </motion.div>

          {/* Max Price */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-4"
          >
            <div className="bg-blue-100 p-3 rounded-full mt-1">
              <CiBookmarkPlus className="text-blue-600 text-xl" />
            </div>
            <div className="w-full">
              <label className="text-sm font-semibold text-blue-900 mb-1 block">
                Max Price
              </label>
              <input
                type="number"
                placeholder="e.g. 5000"
                {...register("maxPrice")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
              />
            </div>
          </motion.div>

          {/* Max People */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-4"
          >
            <div className="bg-blue-100 p-3 rounded-full mt-1">
              <FaUsers className="text-blue-600 text-xl" />
            </div>
            <div className="w-full">
              <label className="text-sm font-semibold text-blue-900 mb-1 block">
                Max People
              </label>
              <input
                type="number"
                placeholder="e.g. 10"
                {...register("groupSize")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
              />
            </div>
          </motion.div>

          {/* Search Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center lg:justify-end"
          >
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 cursor-pointer text-white px-6 py-3 rounded-full shadow-md text-base flex items-center gap-2"
            >
              <FaSearch />
              <span className="hidden sm:inline">Search</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </form>

      {/* Search Results */}
      <div className="max-w-7xl mx-auto mt-6">
        {loading && <p className="text-blue-600">Loading results...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && results.length > 0 && (
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
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-6"
          >
            {results.map((tour) => (
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
            ))}
          </motion.div>
        )}

        {/* only show "No tours found" after search */}
        {!loading && searched && results.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-500 text-center py-8"
          >
            No tours found. Try different filters.
          </motion.p>
        )}
      </div>
    </div>
  );
}

import { FaMapMarkerAlt, FaSearch, FaUsers } from "react-icons/fa";
import { CiBookmarkMinus, CiBookmarkPlus } from "react-icons/ci";
import { motion } from "framer-motion";

export default function TourSearchBar() {
  return (
    <div className="mt-6 mb-6 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto bg-white shadow-xl rounded-3xl p-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-5 items-end border border-blue-100"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-start gap-4"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-start gap-4"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-start gap-4"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-start gap-4"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center lg:justify-end"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 cursor-pointer text-white px-6 py-3 rounded-full shadow-md text-base flex items-center gap-2"
          >
            <FaSearch />
            <span className="hidden sm:inline">Search</span>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}

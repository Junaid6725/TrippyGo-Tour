import React from "react";
import { FaHeart, FaFacebook, FaLinkedin, FaPinterest } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { BsFillThreadsFill } from "react-icons/bs";
import { quickLinks, support } from "../../../data";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 relative overflow-hidden mt-3">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 to-purple-100/30" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center shadow-md">
                <img
                  src="/logo1.jpg"
                  alt="TrippyGo Logo"
                  className="w-8 h-8 object-cover rounded"
                />
              </div>
              <span className="text-2xl font-bold text-sky-600">TrippyGo</span>
            </div>

            <p className="text-gray-600 mb-6 max-w-md leading-relaxed">
              Building exceptional travel experiences with modern design
              principles and cutting-edge technology. Discover the world with
              us.
            </p>

            <div className="flex space-x-4">
              {[
                BsFillThreadsFill,
                FaSquareXTwitter,
                FaLinkedin,
                FaFacebook,
                FaPinterest,
              ].map((Icon, idx) => (
                <motion.a
                  key={idx}
                  href="#"
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-gray-200 hover:bg-blue-100 rounded-lg flex items-center justify-center transition-all duration-300 group"
                >
                  <Icon className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((item, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    to={item.path}
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Support
            </h3>
            <ul className="space-y-3">
              {support.map((item, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    to={item.path}
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-gray-200 pt-8 flex flex-col md:flex-row items-center justify-between"
        >
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © 2025 TrippyGo. All rights reserved.
          </p>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>Made with</span>
            <FaHeart className="text-red-500 animate-pulse" />
            <span>by Our Team</span>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;

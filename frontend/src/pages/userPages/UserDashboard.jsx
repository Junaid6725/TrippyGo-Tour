import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaCog,
  FaInfoCircle,
  FaEnvelope,
} from "react-icons/fa";
import { motion } from "framer-motion";

const menus = [
  { name: "Home", path: "/", icon: <FaHome className="text-2xl" /> },
  { name: "Profile", path: "/profile", icon: <FaUser className="text-2xl" /> },
  {
    name: "Booking",
    path: "/about",
    icon: <FaInfoCircle className="text-2xl" />,
  },
];

const UserDashboard = () => {
  const { pathname } = useLocation();

  return (
    <motion.aside
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="h-auto w-20 md:w-48 bg-white border-r border-gray-200 dark:bg-gray-900 shadow-xl rounded-r-2xl"
    >
      <div className="h-full flex flex-col items-center py-6">
        <nav className="flex-1 w-full px-3 space-y-3 mt-4">
          {menus.map((item, idx) => {
            const isActive = pathname === item.path;
            return (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05, x: 6 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  to={item.path}
                  className={`w-full p-3 flex justify-center md:justify-start items-center rounded-lg gap-3 font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md"
                      : "text-gray-600 hover:bg-indigo-50 dark:hover:bg-gray-800 hover:text-indigo-600"
                  }`}
                >
                  <motion.span
                    animate={{ rotate: isActive ? 360 : 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    {item.icon}
                  </motion.span>
                  <span className="text-base hidden md:flex">{item.name}</span>
                </Link>
              </motion.div>
            );
          })}
        </nav>
      </div>
    </motion.aside>
  );
};

export default UserDashboard;

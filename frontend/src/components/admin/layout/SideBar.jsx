import React from "react";
import { FaHome, FaRegQuestionCircle, FaUser } from "react-icons/fa";
import { MdOutlineTour } from "react-icons/md";
import { TbBrandBooking } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { sidebarItems } from "../../../data";

const SideBar = () => {
  const icons = {
    FaHome: FaHome,
    FaUser: FaUser,
    TbBrandBooking: TbBrandBooking,
    MdOutlineTour: MdOutlineTour,
    FaRegQuestionCircle: FaRegQuestionCircle,
  };

  return (
    <motion.aside
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      className="h-auto w-20 md:w-40 pt-5 text-center bg-white border-r border-gray-200 dark:bg-gray-900 shadow"
    >
      <div className="h-full flex flex-col items-center py-4">
        <nav className="flex-1 w-full px-2 space-y-2">
          {sidebarItems.map((item, index) => {
            const IconComponent = icons[item.icon];

            return (
              <NavLink
                key={index}
                to={item.link}
                end
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ease-in-out
                 ${
                   isActive
                     ? "bg-indigo-100 text-purple-700 font-semibold shadow-sm"
                     : "text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                 }`
                }
              >
                {IconComponent && (
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <IconComponent className="text-xl md:text-2xl" />
                  </motion.div>
                )}
                <motion.span
                  className="hidden md:inline text-base"
                  whileHover={{ x: 5 }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  {item.text}
                </motion.span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </motion.aside>
  );
};

export default SideBar;

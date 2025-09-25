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
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="h-auto w-20 md:w-48 bg-white border-r border-blue-100 dark:bg-blue-950 shadow-xl rounded-r-2xl"
    >
      <div className="h-full flex flex-col items-center lg:py-12 py-24">
        <nav className="flex-1 w-full px-3 space-y-3 mt-4">
          {sidebarItems.map((item, index) => {
            const IconComponent = icons[item.icon];

            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, x: 6 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <NavLink
                  end
                  to={item.link}
                  className={({ isActive }) =>
                    `w-full p-3 flex justify-center md:justify-start items-center rounded-lg gap-3 font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-blue-50 text-blue-600 font-semibold shadow-sm border border-blue-100"
                        : "text-gray-600 hover:bg-blue-50 hover:text-blue-500 dark:hover:bg-blue-900"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <motion.span
                        animate={{ rotate: isActive ? 360 : 0 }}
                        transition={{ duration: 0.6 }}
                      >
                        <IconComponent className="text-2xl" />
                      </motion.span>
                      <span className="text-base hidden md:flex">
                        {item.text}
                      </span>
                    </>
                  )}
                </NavLink>
              </motion.div>
            );
          })}
        </nav>
      </div>
    </motion.aside>
  );
};

export default SideBar;

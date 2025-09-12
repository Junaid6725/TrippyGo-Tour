import React from "react";
import { FaHome, FaRegQuestionCircle, FaUser } from "react-icons/fa";
import { MdOutlineTour } from "react-icons/md";
import { TbBrandBooking } from "react-icons/tb";
import { NavLink } from "react-router-dom";
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
    <aside className="h-auto w-20 md:w-40 pt-5 text-center bg-white border-r border-gray-200 dark:bg-gray-900 shadow">
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
                  <IconComponent className="text-xl  md:text-2xl" />
                )}
                <span className="hidden md:inline text-base">{item.text}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default SideBar;

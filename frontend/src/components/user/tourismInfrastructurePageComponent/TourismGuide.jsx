import React from "react";
import { tourismGuide } from "../../../data";
import {
  MdOutlineFlight,
  MdOutlineHotel,
  MdOutlineRestaurant,
  MdOutlineMap,
  MdOutlineWifi,
  MdOutlineElectricBolt,
  MdOutlineWc,
  MdOutlineAltRoute,
  MdOutlineWbSunny,
  MdOutlineEventNote,
} from "react-icons/md";

// Map icons + colors
const iconMap = {
  MdOutlineFlight: { icon: MdOutlineFlight, color: "text-sky-500" },
  MdOutlineHotel: { icon: MdOutlineHotel, color: "text-green-500" },
  MdOutlineRestaurant: { icon: MdOutlineRestaurant, color: "text-orange-500" },
  MdOutlineMap: { icon: MdOutlineMap, color: "text-purple-500" },
  MdOutlineWifi: { icon: MdOutlineWifi, color: "text-blue-500" },
  MdOutlineElectricBolt: {
    icon: MdOutlineElectricBolt,
    color: "text-yellow-500",
  },
  MdOutlineWc: { icon: MdOutlineWc, color: "text-pink-500" },
  MdOutlineAltRoute: { icon: MdOutlineAltRoute, color: "text-red-500" },
  MdOutlineWbSunny: { icon: MdOutlineWbSunny, color: "text-amber-500" },
  MdOutlineEventNote: { icon: MdOutlineEventNote, color: "text-indigo-500" },
};

const TourismGuide = () => {
  return (
    <div className="space-y-8">
      {tourismGuide.map((item, index) => {
        const IconData = iconMap[item.icon];
        if (!IconData) return null;
        const Icon = IconData.icon;

        return (
          <div
            key={index}
            className="flex items-start gap-5 border-l-4 border-blue-500 pl-4 hover:translate-x-2 transition-transform duration-200"
          >
            {/* Icon */}
            
            <Icon
              className={`flex-shrink-0 ${IconData.color} text-3xl md:text-4xl mt-1`}
            />

            {/* Text */}
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-[#0A2025] dark:text-white">
                {item.heading}
              </h3>
              <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                {item.text}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TourismGuide;

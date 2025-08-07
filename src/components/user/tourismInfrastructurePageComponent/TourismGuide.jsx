import React from "react";
import { tourismGuide } from "../../../data";
import { MdOutlineInfo } from "react-icons/md";

const TourismGuide = () => {
  return (
    <>
      {tourismGuide.map((item, index) => (
        <div key={index} className="space-y-2">
          <h3 className="text-xl md:text-2xl font-semibold text-[#0A2025] dark:text-white">
            <MdOutlineInfo className="text-[#0A2025] dark:text-white text-xl md:text-2xl" />
            {item.heading}
          </h3>
          <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
            {item.text}
          </p>
        </div>
      ))}
    </>
  );
};

export default TourismGuide;

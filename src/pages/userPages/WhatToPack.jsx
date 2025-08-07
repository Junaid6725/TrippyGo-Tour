import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import CommonHeroSection from "./../../components/user/shared/CommonHeroSection";

const packingItems = [
  "Warm and quick drying layers for mountainous terrains",
  "Warm jacket",
  "Thermal",
  "Raincoat",
  "Joggers",
  "Trekking shoes, socks, and stick",
  "Warm socks, gloves, and cap",
  "Sun protection – hat, sunscreen, sunglasses",
  "Sandals",
  "Torch",
  "Re-usable water bottle",
  "Head scarf or shawl (for women)",
  "Modest clothes (no shorts or sleeveless)",
  "Travel chargers (2 round pins) – 220-240 Volts",
  "Extra camera battery",
  "Power bank",
  "Ear plugs",
  "Quick dry travel towel",
  "Travel pillow",
  "Personal medications & first aid",
  "Sanitary products (for women)",
  "Wash-bag: soap, shampoo, deodorant, etc.",
  "Books, journal, or music for long drives",
  "Travel bag locks",
  "Neck wallet or money belt",
];
const WhatToPack = () => {
  return (
    <>
      <CommonHeroSection />
      <section className="bg-gray-50 dark:bg-[#0A2025] px-4 py-12 md:px-16">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-purple-700 dark:text-purple-300">
              Recommended Packing List
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              Pack light! While help may be available, bulky luggage is
              difficult to manage in Pakistan’s terrain. Use a backpack and a
              daypack, and always carry your original CNIC or passport with a
              valid visa.
            </p>
          </div>

          {/* List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 ">
            {packingItems.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <FaCheckCircle className="text-purple-600 dark:text-purple-400 mt-1" />
                <p className="text-gray-700 dark:text-gray-200 text-sm md:text-base">
                  {item}
                </p>
              </div>
            ))}
          </div>

          {/* Note */}
          <p className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
            * Adjust this list based on your tour type and personal preferences.
          </p>
        </div>
      </section>
    </>
  );
};

export default WhatToPack;

import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import CommonHeroSection from "./../../components/user/shared/CommonHeroSection";
import { packingItems } from "../../data";

const WhatToPack = () => {
  return (
    <>
      <CommonHeroSection title="Packing List" />
      <section className="bg-gray-50 dark:bg-[#0A2025] px-4 py-12 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-purple-700 dark:text-purple-300">
              Recommended Packing List
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-sm leading-relaxed">
              Pack light! While help may be available, bulky luggage is
              difficult to manage in Pakistan’s terrain. Use a backpack and a
              daypack, and always carry your original CNIC or passport with a
              valid visa.
            </p>
          </div>

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

          <p className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
            * Adjust this list based on your tour type and personal preferences.
          </p>
        </div>
      </section>
    </>
  );
};

export default WhatToPack;

import React from "react";
import CommonHeroSection from "../../components/user/shared/CommonHeroSection";
import { tips } from "../../data";
import {
  FaRecycle,
  FaUsers,
  FaCamera,
  FaHandHoldingHeart,
  FaFemale,
} from "react-icons/fa";

const iconMap = {
  FaRecycle: <FaRecycle className="text-green-500 text-2xl md:text-3xl" />,
  FaUsers: <FaUsers className="text-indigo-500 text-2xl md:text-3xl" />,
  FaHandHoldingHeart: (
    <FaHandHoldingHeart className="text-pink-500 text-2xl md:text-3xl" />
  ),
  FaCamera: <FaCamera className="text-yellow-500 text-2xl md:text-3xl" />,
  FaFemale: <FaFemale className="text-red-500 text-2xl md:text-3xl" />,
};

export default function Responsibilities() {
  return (
    <>
      <CommonHeroSection title="Responsible Tourism" />
      <section className="bg-white dark:bg-[#0A2025] px-5 py-12 md:px-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white text-center mb-6">
            How Can You Be a Responsible Tourist?
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
            Pakistan is developing as a tourist destination, and your actions as
            a visitor shape its future. Let’s travel responsibly, leaving behind
            nothing but positive impact and meaningful memories.
          </p>

          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2">
            {tips.map((tip, index) => (
              <div
                key={index}
                className="flex items-start gap-4 bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition"
              >
                <div>{iconMap[tip.icon]}</div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-white mb-1">
                    {tip.title}
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {tip.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

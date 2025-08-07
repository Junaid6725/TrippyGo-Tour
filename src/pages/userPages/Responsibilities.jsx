import React from "react";
import {
  FaRecycle,
  FaUsers,
  FaCamera,
  FaHandHoldingHeart,
  FaFemale,
} from "react-icons/fa";
import CommonHeroSection from "../../components/user/shared/CommonHeroSection";

const tips = [
  {
    icon: <FaRecycle className="text-green-500 text-2xl md:text-3xl" />,
    title: "Minimize Waste",
    description:
      "Dispose of your waste properly. Carry a reusable water bottle and avoid plastic bags, straws, or disposable containers. Waste management is limited in Pakistan, so generate as little as possible.",
  },
  {
    icon: <FaUsers className="text-indigo-500 text-2xl md:text-3xl" />,
    title: "Respect Local Culture",
    description:
      "Observe the customs without judgment. You're a guest — what may be different or surprising isn't yours to change. Respect and humility go a long way.",
  },
  {
    icon: <FaHandHoldingHeart className="text-pink-500 text-2xl md:text-3xl" />,
    title: "Don't Encourage Begging",
    description:
      "Avoid giving money to beggars, especially children. It keeps them from pursuing education. Share leftover food instead if you want to help.",
  },
  {
    icon: <FaCamera className="text-yellow-500 text-2xl md:text-3xl" />,
    title: "Ask Before Taking Photos",
    description:
      "Always ask for permission before photographing people, especially women. Be mindful when sharing photos later to respect their privacy.",
  },
  {
    icon: <FaFemale className="text-red-500 text-2xl md:text-3xl" />,
    title: "Advice for Female Travelers",
    description:
      "Be cautious when interacting with men. Some may flirt or have misguided assumptions about foreign women. Your behavior impacts how future visitors are treated.",
  },
];

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
                <div>{tip.icon}</div>
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

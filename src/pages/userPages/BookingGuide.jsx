import React from "react";
import {
  FaRegClipboard,
  FaCalendarCheck,
  FaWallet,
  FaPlaneDeparture,
} from "react-icons/fa";
import CommonHeroSection from "../../components/user/shared/CommonHeroSection";

const steps = [
  {
    icon: <FaRegClipboard className="text-blue-600 text-3xl" />,
    title: "Choose Your Tour",
    description:
      "Browse our wide range of tour packages and select the one that best suits your travel dreams.",
  },
  {
    icon: <FaCalendarCheck className="text-green-600 text-3xl" />,
    title: "Book Your Dates",
    description:
      "Check availability and pick your desired travel dates with just a few clicks.",
  },
  {
    icon: <FaWallet className="text-yellow-500 text-3xl" />,
    title: "Secure Payment",
    description:
      "Make safe and secure payments via multiple payment options, locally and internationally.",
  },
  {
    icon: <FaPlaneDeparture className="text-purple-600 text-3xl" />,
    title: "Pack & Go",
    description:
      "Get ready for the adventure! We'll handle the rest to give you a memorable experience.",
  },
];

export default function BookingGuide() {
  return (
    <>
      <CommonHeroSection title="Booking Guide" />
      <section className="bg-white dark:bg-[#0A2025] px-5 py-12 md:px-20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-10">
            Booking Guide
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition duration-300"
              >
                <div className="mb-4">{step.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

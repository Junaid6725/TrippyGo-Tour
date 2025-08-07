import React from "react";
import { FaQuestionCircle, FaUsers } from "react-icons/fa";
import { MdOutlineTour } from "react-icons/md";
import { TbBrandBooking } from "react-icons/tb";

const steps = [
  {
    icon: <MdOutlineTour className="text-3xl text-green-500" />,
    title: "Tour",
    count: 3,
  },
  {
    icon: <TbBrandBooking className="text-3xl text-blue-500" />,
    title: "Booking",
    count: 4,
  },
  {
    icon: <FaUsers className="text-3xl text-purple-500" />,
    title: "Users",
    count: 4,
  },
  {
    icon: <FaQuestionCircle className="text-3xl text-yellow-500" />,
    title: "Query",
    count: 4,
  },
];
const Dashboard = () => {
  return (
    <>
      <main className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-semibold text-gray-900 text-center">
          Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-6 ">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition duration-300"
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                {step.title}
              </h3>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                {step.count}
              </p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Dashboard;

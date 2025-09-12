import React from "react";
import WhyChooseCard from "./WhyChooseCard";

const WhyChooseUs = () => {
  return (
    <>
      <div className="flex items-center justify-between px-4 py-2 mt-3">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
          Why Choose Landwind
        </h1>
      </div>

      <div className="mt-10 mx-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <WhyChooseCard />
      </div>
    </>
  );
};

export default WhyChooseUs;

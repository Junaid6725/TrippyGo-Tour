import React from "react";
import TourismGuide from "./../../components/user/tourismInfrastructurePageComponent/TourismGuide";
import CommonHeroSection from "../../components/user/shared/CommonHeroSection";

const TourismInfrastructure = () => {
  return (
    <>
      <CommonHeroSection title="Tourism Infrastructure" />
      <section className="bg-white dark:bg-[#0A2025] px-5 py-12 md:px-20">
        <div className="max-w-5xl mx-auto space-y-10">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-6">
            Travel Advisory
          </h2>

          <TourismGuide />
        </div>
      </section>
    </>
  );
};

export default TourismInfrastructure;

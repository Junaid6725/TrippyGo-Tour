import React from "react";
import AboutCard from "./AboutCard";

const AboutSection = () => {
  return (
    <>
      <section className=" py-16 px-8  overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 mt-3 mb-4">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
            About Us
          </h1>
        </div>
        <AboutCard />
      </section>
    </>
  );
};

export default AboutSection;

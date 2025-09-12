import React from "react";

const CommonHeroSection = ({ title }) => {
  return (
    <section className="relative w-full h-[300px]  md:h-[400px] lg:h-[400px] xl:h-[500px] overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
        alt="Tourism Banner"
        className="w-full h-full object-cover"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-purple-800/50 to-black/70 flex flex-col justify-center items-center text-center px-4 sm:px-8">
        <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-extrabold drop-shadow-xl tracking-tight animate-fadeIn">
          {title}
        </h1>

        <p className="text-white mt-4 sm:mt-6 text-base sm:text-lg md:text-xl max-w-3xl drop-shadow-lg  delay-100">
          Travel responsibly. Support local culture, protect nature, and leave a
          positive impact wherever you go.
        </p>
      </div>
    </section>
  );
};

export default CommonHeroSection;

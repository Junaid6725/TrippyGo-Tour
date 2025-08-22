import React from "react";

const HeroSection = () => {
  return (
    <>
      <div className="w-full h-72 md:h-96 lg:h-[500px] overflow-hidden shadow-md">
        <img
          src="/banner.jpg"
          alt=""
          className=" w-full h-full object-cover "
        />
      </div>
    </>
  );
};

export default HeroSection;

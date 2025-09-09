import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const AboutCard = () => {
  return (
    <>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-center md:space-x-12">
        <div className="w-full md:w-1/2">
          <h2 className="text-xl font-bold mb-4 ">Our Story</h2>
          <p className="mb-4 text-gray-900 leading-relaxed">
            We are committed to delivering innovative solutions with a focus on
            quality and customer satisfaction. Our team of experts works
            tirelessly to bring your ideas to life and help your business grow.
          </p>
          <p className="mb-4 text-gray-900 leading-relaxed">
            Join us on our journey to make a difference in the industry through
            creativity, dedication, and excellence.
          </p>
          <Link
            to="/about"
            className="group flex items-center gap-1 text-lg md:text-xl text-purple-600 hover:text-purple-800 font-medium cursor-pointer transition-all duration-300 mb-2"
          >
            See All
            <FaLongArrowAltRight className="transform transition-transform duration-300 group-hover:rotate-360" />
          </Link>
        </div>
        <div className="w-full md:w-1/2 mb-8 md:mb-0">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.4&auto=format&fit=crop&w=800&q=80"
            alt="Our Team"
            className="rounded-lg shadow-lg object-cover w-full h-full"
          />
        </div>
      </div>
    </>
  );
};

export default AboutCard;

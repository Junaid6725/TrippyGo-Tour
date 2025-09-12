import React from "react";
import { CiStar } from "react-icons/ci";
import { Link } from "react-router-dom";

const TourCard = ({ tour }) => {
  return (
    <>
      <div className="group relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2  max-w-sm w-full mx-auto">
        <div className="relative overflow-hidden h-60 sm:h-72 md:h-80">
          <img
            src={tour.imgUrl}
            alt={tour.imgAlt}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        <div className="p-4 sm:p-5">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-gray-800">
                {tour.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500">
                {tour.location}
              </p>
            </div>
            <div className="text-right">
              <p className="text-base sm:text-lg font-bold text-indigo-600">
                ${tour.expenditure}
              </p>
            </div>
          </div>

          <div className="mt-3">
            <div className="flex items-center justify-between">
              <div className="flex text-yellow-400 text-xl sm:text-2xl">
                <CiStar />
                <CiStar />
                <CiStar />
                <CiStar />
                <CiStar />
              </div>
              <span className="text-xs text-gray-500 ml-2 sm:text-sm">
                (256 reviews)
              </span>
            </div>

            <div className="mt-4 transform group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <Link
                to={`/tours/${tour._id}`}
                className="w-full bg-purple-700 hover:bg-purple-800 text-white py-2 sm:py-2.5 rounded-lg font-medium transition-colors duration-300 text-sm sm:text-base flex items-center justify-center gap-2  hover:cursor-pointer"
              >
                See More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TourCard;

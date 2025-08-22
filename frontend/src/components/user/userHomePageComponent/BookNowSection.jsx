import React from "react";
import { CiBookmark } from "react-icons/ci";

const BookNowSection = () => {
  return (
    <>
      <div className="relative bg-[#fef8f4] mx-4  overflow-hidden rounded-xl">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="flex items-center justify-center px-8 py-16 bg-[#fef8f4] relative z-10 ">
            <div>
              <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Grab up to <span className="text-purple-900">35% off</span>
                <br />
                on your favorite <br /> <span className="">Destination</span>
              </h1>
              <p className="text-gray-600 mt-4">
                Limited time offer, don't miss the opportunity
              </p>

              <button className="mt-6 inline-flex items-center bg-purple-900 hover:bg-orange-600 hover:cursor-pointer text-white font-semibold px-6 py-3 rounded-md transition gap-2 ">
                Book Now <CiBookmark className="text-2xl" />
              </button>
            </div>
          </div>

          <div className="relative">
            <img
              src="/banner-img.webp"
              alt="Hot air balloons"
              className="w-full h-64 md:h-full object-cover "
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BookNowSection;

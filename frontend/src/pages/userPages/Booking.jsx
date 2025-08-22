import React from "react";
import { FaHourglassStart, FaStar } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { IoLocation } from "react-icons/io5";
import { MdOutlineAttachMoney } from "react-icons/md";

const Booking = () => {
  return (
    <>
      {/* <article
        className="relative isolate flex flex-col overflow-hidden rounded-2xl  
  px-4 sm:px-6 md:px-8 pb-8 pt-40 
  w-full sm:w-[90%] md:w-[80%] lg:w-[60%]
  mx-4 sm:mx-6 lg:mx-auto mt-12 sm:mt-16 md:mt-20 
  h-[200px] sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px]"
      >
        <img
          src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a"
          alt="University of Southern California"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40" />
      </article> */}
      <section className="max-w-[1200px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="w-full">
            <img
              src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a"
              alt="Tour Destination"
              className="rounded-2xl w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
            />

            <div className="bg-white shadow mt-6 rounded-xl p-6">
              <h2 className="text-2xl font-bold">Lahore</h2>
              <div className="flex gap-4 mt-2 text-gray-600">
                <span className="flex justify-center items-center gap-1">
                  <FaStar className="text-xl text-yellow-400 " /> Not rated
                </span>
                <span className="flex justify-center items-center gap-1">
                  <FaHourglassStart className="text-lg text-gray-700" /> 34 days
                </span>
              </div>
              <div className="flex gap-4 mt-2 text-sm text-gray-600">
                <span className="flex justify-center items-center gap-1">
                  <IoLocation className="text-xl text-gray-700" /> Pakistan
                </span>
                <span className="flex justify-center items-center gap-1">
                  <MdOutlineAttachMoney className="text-xl text-gray-700" />
                  34567884 / per person
                </span>
                <span className="flex justify-center items-center gap-1">
                  <FaUsers className="text-xl text-gray-700" /> 6 people
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-xl p-6">
            <h3 className="text-3xl font-semibold text-right">
              $34567884{" "}
              <span className="text-gray-500 text-base">/ per person</span>
            </h3>

            <form className="space-y-4 mt-6">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-2 border rounded"
              />
              <input
                type="tel"
                placeholder="Phone No"
                className="w-full p-2 border rounded"
              />
              <input type="date" className="w-full p-2 border rounded" />
              <input
                type="number"
                placeholder="Total Members"
                className="w-full p-2 border rounded"
              />

              <div className="text-sm text-gray-600">
                <div className="flex justify-between mt-2">
                  <span>$34567884 × 1 person</span>
                  <span>$34567884</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span>Service Charge</span>
                  <span>$50</span>
                </div>
              </div>

              <div className="flex justify-between font-bold text-lg mt-4">
                <span>Total</span>
                <span>$34567934</span>
              </div>

              <button className="w-full text-white bg-purple-900 hover:bg-orange-600 rounded-md text-lg py-2 transition-colors hover:cursor-pointer">
                Book Now
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Booking;

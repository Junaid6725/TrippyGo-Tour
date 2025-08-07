import React from "react";
import { FaHome, FaRegQuestionCircle, FaUser } from "react-icons/fa";
// import { GrGallery } from "react-icons/gr";
import { MdOutlineTour } from "react-icons/md";
import { TbBrandBooking } from "react-icons/tb";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <>
      <aside className="h-auto  w-20  md:w-40  bg-white border-r border-gray-200 dark:bg-gray-900 shadow">
        <div className="h-full flex flex-col items-center py-4">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-400 rounded-xl flex items-center justify-center shadow-md">
              <img
                src="/logo1.jpg"
                alt=""
                className="w-8 h-8 object-cover rounded"
              />
            </div>
          </div>
          <nav className="flex-1 w-full px-2 space-y-2 mt-6">
            <Link
              className="w-full p-3 flex justify-center items-center rounded-lg bg-indigo-50 text-indigo-600 hover:cursor-pointer gap-2 "
              to="/admin/dashboard"
            >
              <FaHome className="text-3xl" />
              <span className="text-lg hidden  md:flex">Home</span>
            </Link>
            <Link
              className="w-full p-3 flex justify-center items-center  rounded-lg text-gray-500 hover:bg-gray-50 hover:cursor-pointer gap-2"
              to="/admin/users"
            >
              <FaUser className="text-2xl" />
              <span className="text-lg hidden md:flex">User</span>
            </Link>
            <Link
              to="/admin/booking"
              className="w-full p-3 flex justify-center items-center rounded-lg text-gray-500 hover:bg-gray-50  hover:cursor-pointer gap-2"
            >
              <TbBrandBooking className="text-3xl" />{" "}
              <span className="text-lg hidden md:flex">Booking</span>
            </Link>
            {/* <button className="w-full p-3 flex justify-center items-center  rounded-lg text-gray-500 hover:bg-gray-50 hover:cursor-pointer gap-2">
              <GrGallery className="text-3xl" />{" "}
              <span className="text-lg hidden md:flex">Gallery</span>
            </button> */}
            <Link
              to="/admin/tour"
              className="w-full p-3 flex justify-center items-center rounded-lg text-gray-500 hover:bg-gray-50 hover:cursor-pointer gap-2"
            >
              <MdOutlineTour className="text-3xl" />
              <span className="text-lg hidden md:flex">Tour</span>
            </Link>
            <Link
              to="/admin/query"
              className="w-full p-3 flex justify-center items-center rounded-lg text-gray-500 hover:bg-gray-50 hover:cursor-pointer gap-2"
            >
              <FaRegQuestionCircle className="text-3xl" />
              <span className="text-lg hidden md:flex">Query</span>
            </Link>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default SideBar;

import React from "react";

const Navbar = () => {
  return (
    <>
      <nav className="bg-white border-b border-gray-200 dark:bg-gray-900 shadow ">
        <div className="max-w-screen-xl mx-auto px-4 py-2 flex items-center justify-end gap-2 ">
          <img
            src="https://cdn.rareblocks.xyz/collection/clarity/images/team/1/team-member-1.png"
            alt=""
            className="rounded-full w-10 h-10"
          />
          <span className="hidden sm:flex font-bold text-gray-500 text-xl">
            John
          </span>
          <button className=" rounded bg-purple-800 text-white py-3 px-4 text-shadow-white hover:cursor-pointer">
            Logout
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

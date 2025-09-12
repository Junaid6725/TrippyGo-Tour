import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "./../../../reduxToolkit/slices/authSlices/authSlices.js";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    Swal.fire({
      icon: "warning",
      text: "Are You Sure",
      showCancelButton: true,
      cancelButtonColor: "red",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logout());
        navigate("/login");
      }
    });
  };
  return (
    <>
      <nav className="bg-white border-b border-gray-200 dark:bg-gray-900 shadow">
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-400 rounded-xl flex items-center justify-center shadow-md">
              <img
                src="/logo1.jpg"
                alt="Logo"
                className="w-8 h-8 object-cover rounded"
              />
            </div>
            <span className="font-bold text-lg text-gray-700 dark:text-white hidden sm:block">
              TrippyGo
            </span>
          </div>

          <div className="flex items-center gap-3">
            <img
              src="https://cdn.rareblocks.xyz/collection/clarity/images/team/1/team-member-1.png"
              alt="profile"
              className="rounded-full w-10 h-10"
            />
            <span className="hidden sm:flex font-bold text-gray-500 text-lg">
              John
            </span>
            <button
              className="rounded bg-purple-700 hover:bg-purple-800 text-white py-2 px-4 transition-all duration-300"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

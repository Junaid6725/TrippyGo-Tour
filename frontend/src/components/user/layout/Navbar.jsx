import React, { useState } from "react";
import { MdMenu, MdClose } from "react-icons/md";
import { navItems } from "../../../data";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../reduxToolkit/slices/authSlices/authSlices";
import Swal from "sweetalert2";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);

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
    <nav className="bg-white border-b border-gray-200 dark:bg-gray-900 shadow w-full ">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center shadow-md">
            <img
              src="/logo1.jpg"
              alt="Logo"
              className="w-8 h-8 object-cover rounded"
            />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            TrippyGo
          </span>
        </Link>

        <div className="hidden lg:flex space-x-6">
          {navItems.map((item, i) => (
            <NavLink
              key={i}
              to={item.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-purple-700 dark:text-white"
                    : "text-gray-700 hover:text-purple-700 dark:text-gray-300 dark:hover:text-white"
                }`
              }
            >
              {item.navlink}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center space-x-3">
          <div className="hidden lg:flex items-center space-x-2">
            {!token ? (
              <>
                <Link
                  to="/login"
                  className="bg-purple-700 hover:bg-purple-800 text-white text-sm px-4 py-2 rounded-lg transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-purple-700 hover:bg-purple-800 text-white text-sm px-4 py-2 rounded-lg transition-all duration-200"
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-purple-700 hover:bg-purple-800 text-white text-sm px-4 py-2 rounded-lg transition-all duration-200"
              >
                Logout
              </button>
            )}
          </div>

          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              {isOpen ? (
                <MdClose size={26} className="hover:cursor-pointer" />
              ) : (
                <MdMenu size={26} className="hover:cursor-pointer" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`lg:hidden px-4 pb-4 transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <ul className="flex flex-col space-y-2 mt-2">
          {navItems.map((item, i) => (
            <li key={i}>
              <NavLink
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-white bg-purple-700"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`
                }
              >
                {item.navlink}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex flex-col mt-4 space-y-2">
          {!token ? (
            <>
              <Link
                to="/login"
                className="bg-purple-700 text-white text-sm px-4 py-2 rounded-lg text-center hover:bg-purple-800 transition-all duration-200"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-purple-700 text-white text-sm px-4 py-2 rounded-lg text-center hover:bg-purple-800 transition-all duration-200"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-purple-700 text-white text-sm px-4 py-2 rounded-lg text-center hover:bg-purple-800 transition-all duration-200"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

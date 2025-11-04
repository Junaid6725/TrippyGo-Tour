import React, { useState } from "react";
import { MdMenu, MdClose, MdDashboard } from "react-icons/md";
import { navItems } from "../../../data";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../reduxToolkit/slices/authSlices/authSlices";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token, role } = useSelector((state) => state.auth);

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

  const handleDashboardRedirect = () => {
    if (role === "admin") {
      navigate("/admin-dashboard");
    } else {
      navigate("/user-dashboard");
    }
  };
  return (
    <nav className="bg-white border-b border-gray-200 shadow w-full sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center shadow-md">
              <img
                src="/logo1.jpg"
                alt="Logo"
                className="w-8 h-8 object-cover rounded"
              />
            </div>
            <span className="text-2xl font-bold text-sky-600">TrippyGo</span>
          </Link>
        </motion.div>

        <div className="hidden lg:flex space-x-4 relative">
          {navItems.map((item, i) => (
            <NavLink key={i} to={item.path} end>
              {({ isActive }) => (
                <div className="relative px-3 py-2 rounded-md text-sm font-medium">
                  <span
                    className={`transition-colors duration-200 ${
                      isActive
                        ? "text-sky-700 font-semibold"
                        : "text-gray-700 hover:text-sky-600"
                    }`}
                  >
                    {item.navlink}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="underline"
                      className="absolute bottom-0 left-0 right-0 h-1 bg-sky-500 rounded"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </div>
              )}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center space-x-3">
          <div className="hidden lg:flex items-center space-x-2">
            {!token ? (
              <>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link
                    to="/login"
                    className="bg-sky-500 hover:bg-sky-600 text-white text-sm px-4 py-2 rounded-lg transition-all duration-200"
                  >
                    Login
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link
                    to="/register"
                    className="bg-sky-500 hover:bg-sky-600 text-white text-sm px-4 py-2 rounded-lg transition-all duration-200"
                  >
                    Register
                  </Link>
                </motion.div>
              </>
            ) : (
              <>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <button
                    onClick={handleLogout}
                    className="bg-sky-500 hover:bg-sky-600 text-white text-sm px-4 py-2 rounded-lg transition-all duration-200 hover:cursor-pointer"
                  >
                    Logout
                  </button>
                </motion.div>
                <motion.button
                  onClick={handleDashboardRedirect}
                  className="fixed bottom-6 right-6 bg-sky-500 text-white p-3 rounded-full shadow-lg hover:bg-sky-600"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MdDashboard size={22} />
                </motion.button>
              </>
            )}
          </div>

          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100 transition hover:cursor-pointer"
            >
              {isOpen ? <MdClose size={26} /> : <MdMenu size={26} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden px-4 pb-4 shadow-inner"
          >
            <ul className="flex flex-col space-y-3 mt-2">
              {navItems.map((item, i) => (
                <li key={i} className="mt-1">
                  <NavLink
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded text-sm font-medium transition-colors duration-200 ${
                        isActive
                          ? "text-white bg-sky-500"
                          : "text-gray-700 hover:bg-sky-100"
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
                    className="bg-sky-500 hover:bg-sky-600 text-white text-sm px-4 py-2 rounded-lg text-center transition-all duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-sky-500 hover:bg-sky-600 text-white text-sm px-4 py-2 rounded-lg text-center transition-all duration-200"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <>
                  <button
                    onClick={handleLogout}
                    className="bg-sky-500 hover:bg-sky-600 text-white text-sm px-4 py-2 rounded-lg text-center transition-all duration-200 hover:cursor-pointer"
                  >
                    Logout
                  </button>
                  <motion.button
                    onClick={handleDashboardRedirect}
                    className="fixed bottom-6 right-6 bg-sky-500 text-white p-3 rounded-full shadow-lg hover:bg-sky-600"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MdDashboard size={22} />
                  </motion.button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

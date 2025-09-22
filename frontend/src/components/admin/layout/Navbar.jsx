import React from "react";
import { useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { logout } from "./../../../reduxToolkit/slices/authSlices/authSlices.js";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      icon: "warning",
      title: "Are You Sure?",
      text: "You will be logged out of your account",
      showCancelButton: true,
      confirmButtonColor: "#1d4ed8",
      cancelButtonColor: "#dc2625",
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
      background: "#f8fafc",
      iconColor: "#1d4ed8",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logout());
        navigate("/login");
      }
    });
  };

  // Animation variants
  const navVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const logoVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.6,
        type: "spring",
        stiffness: 200,
      },
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: { duration: 0.2 },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, delay: 0.2 },
    },
  };

  const profileVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, delay: 0.3 },
    },
  };

  const buttonVariants = {
    initial: {
      scale: 1,
      backgroundColor: "#0ea5e9",
    },
    hover: {
      scale: 1.05,
      backgroundColor: "#0284c7",
      transition: { duration: 0.2, ease: "easeInOut" },
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 },
    },
  };

  const imageVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 200,
      },
    },
    hover: {
      scale: 1.1,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.nav
      className="bg-white border-b border-blue-200 dark:bg-gray-900 shadow-lg"
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left Section - Logo and Brand */}
        <motion.div className="flex items-center space-x-3" whileHover="hover">
          <motion.div
            variants={logoVariants}
            className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md"
          >
            <motion.img
              src="/logo1.jpg"
              alt="Logo"
              className="w-8 h-8 object-cover rounded"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
          <motion.span
            className="font-bold text-lg text-blue-700 dark:text-blue-300 hidden sm:block"
            variants={textVariants}
          >
            TrippyGo
          </motion.span>
        </motion.div>

        {/* Right Section - Profile and Logout */}
        <motion.div
          className="flex items-center gap-4"
          variants={profileVariants}
        >
          <motion.div className="flex items-center gap-3" whileHover="hover">
            <motion.img
              src="https://cdn.rareblocks.xyz/collection/clarity/images/team/1/team-member-1.png"
              alt="profile"
              className="rounded-full w-10 h-10 border-2 border-blue-200"
              variants={imageVariants}
            />
            <motion.span
              className="hidden sm:flex font-bold text-blue-600 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              John
            </motion.span>
          </motion.div>

          <motion.button
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            className="bg-sky-500 hover:bg-sky-600 text-white text-sm px-4 py-2 rounded-lg transition-all duration-200 hover:cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </motion.button>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;

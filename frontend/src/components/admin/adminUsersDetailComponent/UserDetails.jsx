import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  MdDelete,
  MdSearch,
  MdMoreVert,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdPerson,
  MdEmail,
  MdPhone,
  MdVisibility,
  MdPeople,
} from "react-icons/md";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import useDebounce from "../../../hooks/useDebounce";
import { FaChevronLeft, FaChevronRight, FaSearch } from "react-icons/fa";
import SubtleSpinner from "../../user/shared/SubtleSpinner";
import Pagination from "../../user/shared/Pagination";
import { deleteUser, getAllUsers } from "../../../services/userService";

const UserDetails = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [actionMenuOpen, setActionMenuOpen] = useState(null);

  const debouncedSearch = useDebounce(searchTerm, 500);
  const usersPerPage = 5;
  const token = useSelector((state) => state.auth.token);

  // Fetch users from backend with pagination
  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const res = await getAllUsers(
        token,
        currentPage,
        usersPerPage,
        debouncedSearch
      );
      setUsers(res?.users);
      setTotalPages(res?.totalPages);
      setCurrentPage(res?.page);
      setTotalUsers(res?.total || 0);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage, debouncedSearch]);

  // Toggle action menu
  const toggleActionMenu = (userId) => {
    setActionMenuOpen(actionMenuOpen === userId ? null : userId);
  };

  // Close action menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".action-menu")) {
        setActionMenuOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Delete user
  const handleDelete = (id, fullname) => {
    Swal.fire({
      title: "Are you sure?",
      html: `This will delete the user <strong>"${fullname}"</strong> permanently!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      background: "#ffffff",
      customClass: {
        popup: "rounded-2xl shadow-2xl",
        confirmButton: "px-6 py-3 rounded-xl font-semibold",
        cancelButton: "px-6 py-3 rounded-xl font-semibold",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteUser(id, token);
          toast.success("User successfully deleted!");
          setActionMenuOpen(null);
          fetchUsers(currentPage);
        } catch (error) {
          console.error("Error deleting user:", error);
          toast.error("Failed to delete user");
        }
      }
    });
  };

  // View user details
  const viewUserDetails = (user) => {
    Swal.fire({
      width: "auto",
      padding: "0",
      html: `
        <div class="p-4 sm:p-6 pb-3 sm:pb-4">
            <!-- Avatar Section -->
            <div class="flex justify-center relative mb-3 sm:mb-4">
                <div class="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xl sm:text-2xl md:text-3xl shadow-lg relative">
                    ${user.fullName.charAt(0).toUpperCase()}
                    <div class="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent"></div>
                </div>
                <!-- Online Status Indicator -->
                <div class="absolute bottom-0 sm:bottom-1 right-1/2 translate-x-6 sm:translate-x-8 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
            </div>

            <!-- User Info -->
            <div class="text-center mb-3 sm:mb-4">
                <h2 class="font-bold text-gray-800 text-lg sm:text-xl md:text-xl mb-2 px-2 break-words">${
                  user.fullName
                }</h2>
                <span class="text-xs sm:text-sm text-white bg-blue-600  px-3 py-1 sm:px-4 sm:py-1.5 rounded-full inline-block shadow-sm max-w-full truncate">
                    ${user.role}  : ${user._id}
                </span>
            </div>

            <!-- Details Card -->
            <div class="bg-gray-50 p-3 sm:p-4 rounded-xl border border-gray-200 mx-2 sm:mx-0 mb-0">
                <!-- Email -->
                <div class="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-white transition-colors duration-200">
                    <div class="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 flex-shrink-0">
                        <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                        </svg>
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="text-xs text-gray-500 font-medium mb-1">Email Address</div>
                        <div class="text-gray-800 font-semibold truncate text-sm sm:text-base">${
                          user.email
                        }</div>
                    </div>
                </div>

                <!-- Phone -->
                <div class="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-white transition-colors duration-200">
                    <div class="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 flex-shrink-0">
                        <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.21c.28-.26.36-.65.25-1C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z"/>
                        </svg>
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="text-xs text-gray-500 font-medium mb-1">Phone Number</div>
                        <div class="text-gray-800 font-semibold text-sm sm:text-base">${
                          user.phoneNumber || "Not provided"
                        }</div>
                    </div>
                </div>
            </div>
        </div>
        `,
      showConfirmButton: true,
      showCloseButton: true,
      confirmButtonText: "Close",
      closeButtonHtml: "&times;",
      background: "#ffffff",
      customClass: {
        popup:
          "rounded-2xl shadow-xl mx-4 max-w-sm sm:max-w-md md:max-w-lg w-auto !pb-3",
        closeButton:
          "w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-200 text-base sm:text-lg font-light",
        confirmButton:
          "px-4 py-2 sm:px-5 sm:py-2 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm sm:text-base",
        container: "p-2 sm:p-4",
        actions: "!mt-3 !mb-2 !gap-2",
      },
      buttonsStyling: false,
      icon: false,
      timerProgressBar: false,
      grow: false,
      backdrop: true,
    }).then(() => {
      setActionMenuOpen(null);
    });
  };

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.phoneNumber && user.phoneNumber.includes(searchTerm))
  );

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const tableRowVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-6 w-full"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div className="mb-8 text-center" variants={itemVariants}>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            User Management
          </h1>
          <p className="text-gray-600 text-base max-w-md mx-auto">
            Manage your users and their information efficiently
          </p>
        </motion.div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative flex-1 w-full">
            {/* Search Icon */}
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaSearch className="text-blue-400 text-lg" />
            </div>

            {/* Input Field */}
            <input
              type="text"
              placeholder="Search users by name or email..."
              className="pl-12 pr-10 py-3 w-full border border-blue-200 dark:border-blue-700 rounded-xl bg-white/50 dark:bg-gray-700/50 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 transition-all duration-200 focus:outline-none"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />

            {/* Subtle Spinner */}
            {isLoading && <SubtleSpinner />}
          </div>
        </div>

        {/* Table Container */}
        <motion.div
          className="bg-white shadow-lg rounded-xl overflow-hidden border border-blue-100 mb-6"
          variants={itemVariants}
        >
          {/* Table Wrapper */}
          <div className="w-full overflow-x-auto">
            <div className="min-w-full">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-200">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider whitespace-nowrap min-w-[200px]">
                      User Information
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider whitespace-nowrap min-w-[250px]">
                      Email Address
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider whitespace-nowrap min-w-[180px]">
                      Phone Number
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider whitespace-nowrap min-w-[120px]">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-100">
                  {isLoading ? (
                    // Loading skeleton
                    Array.from({ length: 5 }).map((_, index) => (
                      <tr key={index} className="animate-pulse">
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 bg-blue-200 rounded-full"></div>
                            <div className="space-y-2">
                              <div className="h-4 bg-blue-200 rounded w-32"></div>
                              <div className="h-3 bg-blue-200 rounded w-24"></div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="h-4 bg-blue-200 rounded w-48"></div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="h-4 bg-blue-200 rounded w-32"></div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="h-8 bg-blue-200 rounded w-20"></div>
                        </td>
                      </tr>
                    ))
                  ) : filteredUsers.length > 0 ? (
                    filteredUsers.map((user, index) => (
                      <motion.tr
                        key={user._id}
                        variants={tableRowVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: index * 0.1 }}
                        className="hover:bg-blue-50/50 transition-colors duration-200 group"
                      >
                        {/* User Information Column */}
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <motion.div
                              className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4 flex-shrink-0 shadow-md"
                              whileHover={{ scale: 1.1 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              {user.fullName.charAt(0).toUpperCase()}
                            </motion.div>
                            <div className="min-w-0 flex-1">
                              <div className="font-semibold text-gray-800 text-base truncate">
                                {user.fullName}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Email Column */}
                        <td className="px-6 py-4 text-gray-700">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              <MdEmail className="text-blue-600" size={16} />
                            </div>
                            <span className="text-sm font-medium truncate">
                              {user.email}
                            </span>
                          </div>
                        </td>

                        {/* Phone Column */}
                        <td className="px-6 py-4 text-gray-700">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              <MdPhone className="text-blue-600" size={16} />
                            </div>
                            <span className="text-sm font-medium">
                              {user.phoneNumber || "Not provided"}
                            </span>
                          </div>
                        </td>

                        {/* Actions Column */}
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center">
                            <div className="relative action-menu">
                              <motion.button
                                whileHover={{
                                  scale: 1.05,
                                  backgroundColor: "rgba(59, 130, 246, 0.1)",
                                }}
                                whileTap={{ scale: 0.95 }}
                                className="p-2 text-blue-600 rounded-lg transition-all duration-200 border border-blue-200 bg-blue-50"
                                onClick={() => toggleActionMenu(user._id)}
                              >
                                <MdMoreVert size={18} />
                              </motion.button>

                              <AnimatePresence>
                                {actionMenuOpen === user._id && (
                                  <motion.div
                                    initial={{ opacity: 0, scale: 0.8, y: -10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.8, y: -10 }}
                                    transition={{
                                      type: "spring",
                                      stiffness: 500,
                                      damping: 30,
                                    }}
                                    className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-blue-200 z-10 overflow-hidden"
                                  >
                                    <motion.button
                                      whileHover={{
                                        backgroundColor:
                                          "rgba(59, 130, 246, 0.1)",
                                      }}
                                      onClick={() => viewUserDetails(user)}
                                      className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 transition-all duration-200 border-b border-blue-100 text-sm"
                                    >
                                      <MdVisibility
                                        className="text-blue-600"
                                        size={16}
                                      />
                                      View Details
                                    </motion.button>
                                    <motion.button
                                      whileHover={{
                                        backgroundColor:
                                          "rgba(239, 68, 68, 0.1)",
                                      }}
                                      onClick={() =>
                                        handleDelete(user._id, user.fullName)
                                      }
                                      className="flex items-center gap-3 w-full px-4 py-3 text-red-600 transition-all duration-200 text-sm"
                                    >
                                      <MdDelete
                                        className="text-red-500"
                                        size={16}
                                      />
                                      Delete User
                                    </motion.button>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <motion.tr
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <td colSpan={4} className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center justify-center text-gray-500">
                          <motion.div
                            className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4"
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          >
                            <MdPerson className="text-blue-400 text-2xl" />
                          </motion.div>
                          <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            No users found
                          </h3>
                          <p className="text-gray-500 text-sm max-w-xs mx-auto">
                            {searchTerm
                              ? "Try adjusting your search criteria"
                              : "No users available in the system"}
                          </p>
                        </div>
                      </td>
                    </motion.tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Pagination Box */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalUsers}
            itemsPerPage={usersPerPage}
            currentItems={users}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </div>
    </motion.div>
  );
};

export default UserDetails;

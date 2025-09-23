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
  MdBlock,
  MdCheckCircle,
  MdVisibility,
} from "react-icons/md";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const UserDetails = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [actionMenuOpen, setActionMenuOpen] = useState(null);

  const usersPerPage = 5;
  const token = useSelector((state) => state.auth.token);

  // Fetch users from backend with pagination
  const fetchUsers = async (page = 1) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:8000/api/get-users?page=${page}&limit=${usersPerPage}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUsers(response.data.users);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.page);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

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
          await axios.delete(`http://localhost:8000/api/delete-user/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
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

  // Toggle user status
  const toggleUserStatus = async (user) => {
    const newStatus = user.status === "active" ? "inactive" : "active";

    try {
      await axios.put(
        `http://localhost:8000/api/update-user-status/${user._id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(
        `User ${
          newStatus === "active" ? "activated" : "deactivated"
        } successfully!`
      );
      setActionMenuOpen(null);
      fetchUsers(currentPage);
    } catch (error) {
      console.error("Error updating user status:", error);
      toast.error("Failed to update user status");
    }
  };

  // View user details
  const viewUserDetails = (user) => {
    Swal.fire({
      title: user.fullName,
      html: `
        <div class="text-left space-y-4">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              ${user.fullName.charAt(0)}
            </div>
            <div>
              <div class="font-semibold text-gray-800">${user.fullName}</div>
              <div class="text-sm text-gray-600">${user.role || "User"}</div>
            </div>
          </div>
          <div class="space-y-3">
            <div class="flex items-center gap-2">
              <span class="text-blue-500">📧</span>
              <span class="text-gray-700">${user.email}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-blue-500">📱</span>
              <span class="text-gray-700">${
                user.phoneNumber || "Not provided"
              }</span>
            </div>
          </div>
        </div>
      `,
      icon: "info",
      confirmButtonColor: "#3b82f6",
      confirmButtonText: "Close",
      background: "#ffffff",
      customClass: {
        popup: "rounded-2xl shadow-2xl",
      },
    });
    setActionMenuOpen(null);
  };

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.phoneNumber && user.phoneNumber.includes(searchTerm))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            User Management
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Manage your users and their information efficiently
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 items-center justify-between">
            <div className="relative flex-1 w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MdSearch className="text-gray-400" size={20} />
              </div>
              <input
                type="text"
                placeholder="Search users by name, email or phone..."
                className="pl-10 pr-4 py-2 sm:py-3 w-full border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white text-gray-700 placeholder-gray-500 text-sm sm:text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              className="px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg sm:rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-semibold shadow-lg shadow-blue-200 whitespace-nowrap text-sm sm:text-base w-full lg:w-auto mt-2 lg:mt-0"
              onClick={() => fetchUsers(currentPage)}
            >
              Refresh Users
            </button>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-3 sm:px-4 md:px-6 py-3 text-left font-semibold text-gray-700 text-xs sm:text-sm uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-3 sm:px-4 md:px-6 py-3 text-left font-semibold text-gray-700 text-xs sm:text-sm uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-3 sm:px-4 md:px-6 py-3 text-left font-semibold text-gray-700 text-xs sm:text-sm uppercase tracking-wider hidden sm:table-cell">
                    Email
                  </th>
                  <th className="px-3 sm:px-4 md:px-6 py-3 text-left font-semibold text-gray-700 text-xs sm:text-sm uppercase tracking-wider hidden md:table-cell">
                    Phone
                  </th>
                  <th className="px-3 sm:px-4 md:px-6 py-3 text-left font-semibold text-gray-700 text-xs sm:text-sm uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {isLoading ? (
                  // Loading skeleton
                  Array.from({ length: 5 }).map((_, index) => (
                    <tr key={index} className="animate-pulse">
                      <td className="px-3 sm:px-4 md:px-6 py-3">
                        <div className="h-4 bg-gray-200 rounded w-6 sm:w-8"></div>
                      </td>
                      <td className="px-3 sm:px-4 md:px-6 py-3">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <div className="h-8 w-8 sm:h-10 sm:w-10 bg-gray-200 rounded-full"></div>
                          <div className="space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-20 sm:w-32"></div>
                            <div className="h-3 bg-gray-200 rounded w-12 sm:w-24"></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 md:px-6 py-3 hidden sm:table-cell">
                        <div className="h-4 bg-gray-200 rounded w-32 sm:w-48"></div>
                      </td>
                      <td className="px-3 sm:px-4 md:px-6 py-3 hidden md:table-cell">
                        <div className="h-4 bg-gray-200 rounded w-20 sm:w-32"></div>
                      </td>
                      <td className="px-3 sm:px-4 md:px-6 py-3">
                        <div className="h-8 bg-gray-200 rounded w-16 sm:w-20"></div>
                      </td>
                    </tr>
                  ))
                ) : filteredUsers.length > 0 ? (
                  filteredUsers.map((user, index) => (
                    <motion.tr
                      key={user._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="hover:bg-blue-50/30 transition-colors duration-200 group"
                    >
                      <td className="px-3 sm:px-4 md:px-6 py-3">
                        <span className="inline-flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 text-blue-600 rounded-full font-semibold text-xs sm:text-sm">
                          {(currentPage - 1) * usersPerPage + index + 1}
                        </span>
                      </td>

                      <td className="px-3 sm:px-4 md:px-6 py-3">
                        <div className="flex items-center">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-lg mr-2 sm:mr-3 md:mr-4">
                            {user.fullName.charAt(0)}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="font-semibold text-gray-800 text-sm sm:text-base truncate">
                              {user.fullName}
                            </div>
                            <div className="text-xs text-gray-500 sm:hidden flex items-center gap-1 mt-1 truncate">
                              <MdEmail size={10} />
                              <span className="truncate">{user.email}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-3 sm:px-4 md:px-6 py-3 text-gray-700 hidden sm:table-cell">
                        <div className="flex items-center gap-2">
                          <MdEmail
                            className="text-gray-400 hidden md:block"
                            size={14}
                          />
                          <span className="text-sm truncate">{user.email}</span>
                        </div>
                      </td>

                      <td className="px-3 sm:px-4 md:px-6 py-3 text-gray-700 hidden md:table-cell">
                        <div className="flex items-center gap-2">
                          <MdPhone className="text-gray-400" size={14} />
                          <span className="text-sm">
                            {user.phoneNumber || "N/A"}
                          </span>
                        </div>
                      </td>

                      <td className="px-3 sm:px-4 md:px-6 py-3">
                        <div className="flex items-center justify-center">
                          <div className="relative action-menu">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="p-1.5 sm:p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200 border border-gray-300 hover:border-gray-400"
                              onClick={() => toggleActionMenu(user._id)}
                            >
                              <MdMoreVert
                                size={16}
                                className="sm:w-[18px] sm:h-[18px]"
                              />
                            </motion.button>

                            <AnimatePresence>
                              {actionMenuOpen === user._id && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                  animate={{ opacity: 1, scale: 1, y: 0 }}
                                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                  transition={{ duration: 0.2 }}
                                  className="absolute right-0 top-full mt-1 w-40 sm:w-48 bg-white rounded-lg sm:rounded-xl shadow-lg border border-gray-200 z-10 overflow-hidden"
                                >
                                  <button
                                    onClick={() => viewUserDetails(user)}
                                    className="flex items-center gap-2 sm:gap-3 w-full px-3 sm:px-4 py-2 sm:py-3 text-gray-700 hover:bg-blue-50 transition-all duration-200 border-b border-gray-100 text-sm sm:text-base"
                                  >
                                    <MdVisibility
                                      className="text-blue-500"
                                      size={16}
                                    />
                                    View Details
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleDelete(user._id, user.fullName)
                                    }
                                    className="flex items-center gap-2 sm:gap-3 w-full px-3 sm:px-4 py-2 sm:py-3 text-red-600 hover:bg-red-50 transition-all duration-200 text-sm sm:text-base"
                                  >
                                    <MdDelete
                                      className="text-red-500"
                                      size={16}
                                    />
                                    Delete User
                                  </button>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-3 sm:px-4 md:px-6 py-8 sm:py-12 text-center"
                    >
                      <div className="flex flex-col items-center justify-center text-gray-500">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                          <MdPerson className="text-gray-400 text-xl sm:text-2xl" />
                        </div>
                        <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-1 sm:mb-2">
                          No users found
                        </h3>
                        <p className="text-gray-500 text-xs sm:text-sm">
                          {searchTerm
                            ? "Try adjusting your search criteria"
                            : "No users available"}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {!isLoading && totalPages > 1 && (
            <div className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 border-t border-gray-200 bg-gray-50">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
                <div className="text-gray-700 text-xs sm:text-sm font-medium">
                  Showing {(currentPage - 1) * usersPerPage + 1} to{" "}
                  {Math.min(currentPage * usersPerPage, users.length)} of{" "}
                  {users.length} users
                </div>

                <div className="flex items-center space-x-1 sm:space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium border border-gray-300 text-xs sm:text-sm"
                  >
                    <MdKeyboardArrowLeft size={16} />
                    <span className="hidden sm:inline">Previous</span>
                    <span className="sm:hidden">Prev</span>
                  </motion.button>

                  <div className="flex items-center space-x-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNum = i + 1;
                      return (
                        <motion.button
                          key={pageNum}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg font-semibold transition-all duration-200 text-xs sm:text-sm ${
                            currentPage === pageNum
                              ? "bg-blue-500 text-white shadow-lg shadow-blue-200"
                              : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                          }`}
                        >
                          {pageNum}
                        </motion.button>
                      );
                    })}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium border border-gray-300 text-xs sm:text-sm"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <span className="sm:hidden">Next</span>
                    <MdKeyboardArrowRight size={16} />
                  </motion.button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile tip for small screens */}
        <div className="sm:hidden mt-3 p-3 bg-blue-50 rounded-lg text-blue-700 border border-blue-200">
          <p className="flex items-center justify-center gap-2 text-xs">
            <span>💡</span>
            Swipe horizontally to view all columns
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;

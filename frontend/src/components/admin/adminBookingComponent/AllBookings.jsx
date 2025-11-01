import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  MdInfo,
  MdFilterList,
  MdSearch,
  MdClose,
  MdCalendarToday,
  MdPerson,
  MdPhone,
  MdAttachMoney,
  MdAccessTime,
  MdCheck,
  MdEmail,
  MdSchedule,
  MdCheckCircle,
  MdCancel,
  MdDoneAll,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdTimerOff,
} from "react-icons/md";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import useDebounce from "../../../hooks/useDebounce";
import SubtleSpinner from "../../user/shared/SubtleSpinner";
import Pagination from "../../user/shared/Pagination";

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [updateMessage, setUpdateMessage] = useState({ type: "", text: "" });
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const bookingsPerPage = 5;
  const token = useSelector((state) => state.auth.token);
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [totalBookings, setTotalBookings] = useState("");
  const [pendingStatus, setPendingStatus] = useState(0);
  const [confirmedStatus, setConfirmedStatus] = useState(0);
  const [rejectedStatus, setRejectedStatus] = useState(0);
  const [completedStatus, setCompletedStatus] = useState(0);
  const [cancelledStatus, setCancelledStatus] = useState(0);
  const [expiredStatus, setExpiredStatus] = useState(0);

  // Enhanced status options with better configuration
  const statusOptions = [
    {
      value: "expired",
      label: "Expired",
      color: "gray",
      bgColor: "bg-gray-50",
      textColor: "text-gray-700",
      borderColor: "border-gray-200",
    },
    {
      value: "confirmed",
      label: "Confirmed",
      color: "green",
      bgColor: "bg-green-50",
      textColor: "text-green-700",
      borderColor: "border-green-200",
    },
    {
      value: "rejected",
      label: "Rejected",
      color: "red",
      bgColor: "bg-red-50",
      textColor: "text-red-700",
      borderColor: "border-red-200",
    },
    {
      value: "pending",
      label: "Pending",
      color: "yellow",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-700",
      borderColor: "border-yellow-200",
    },
    {
      value: "cancelled",
      label: "Cancelled",
      color: "orange",
      bgColor: "bg-orange-50",
      textColor: "text-orange-700",
      borderColor: "border-orange-200",
    },
    {
      value: "completed",
      label: "Completed",
      color: "blue",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
      borderColor: "border-blue-200",
    },
  ];

  const getStatusConfig = (status) => {
    return (
      statusOptions.find((opt) => opt.value === status?.toLowerCase()) ||
      statusOptions[0]
    );
  };

  const fetchBookings = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get(
        `http://localhost:8000/api/get-bookings?page=${currentPage}&limit=${bookingsPerPage}&search=${debouncedSearch}&status=${
          statusFilter !== "All" ? statusFilter : ""
        }`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Cache-Control": "no-cache",
          },
        }
      );

      if (response.data.success) {
        setBookings(response.data.bookings || []);
        setTotalPages(response.data.totalPages || 1);
        setPendingStatus(response.data.pending);
        setConfirmedStatus(response.data.confirmed);
        setCompletedStatus(response.data.completed);
        setRejectedStatus(response.data.rejected);
        setCancelledStatus(response.data.cancelled);
        setExpiredStatus(response.data.expired);

        setTotalBookings(response.data.total || 0);
      } else {
        setBookings([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setUpdateMessage({
        type: "error",
        text: "Failed to load bookings. Please try again.",
      });
      setBookings([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchBookings();
  }, [currentPage, debouncedSearch, statusFilter]);

  const updateBookingStatus = async (bookingId, newStatus) => {
    if (!bookingId) return;

    setUpdatingStatus(bookingId);
    setUpdateMessage({ type: "", text: "" });

    try {
      const bookingToUpdate = bookings.find((b) => b._id === bookingId);
      if (!bookingToUpdate) return;

      const oldStatus = bookingToUpdate.bookingStatus;

      const response = await axios.put(
        `http://localhost:8000/api/update-booking/${bookingId}`,
        { bookingStatus: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setBookings((prev) =>
          prev.map((b) =>
            b._id === bookingId ? { ...b, bookingStatus: newStatus } : b
          )
        );

        // update counts for both pending and confirmed
        const updateCount = (status, setter) => {
          if (oldStatus === status && newStatus !== status)
            setter((p) => Math.max(0, p - 1));
          else if (oldStatus !== status && newStatus === status)
            setter((p) => p + 1);
        };

        updateCount("pending", setPendingStatus);
        updateCount("confirmed", setConfirmedStatus);
        updateCount("rejected", setRejectedStatus);
        updateCount("completed", setCompletedStatus);
        updateCount("expired", setExpiredStatus);
        updateCount("cancelled", setCancelledStatus);

        setUpdateMessage({
          type: "success",
          text: "Booking status updated successfully!",
        });

        setTimeout(() => setUpdateMessage({ type: "", text: "" }), 3000);
      }
    } catch (error) {
      console.error("Error updating booking status:", error);
      setUpdateMessage({
        type: "error",
        text: "Failed to update status. Please try again.",
      });
    } finally {
      setUpdatingStatus(null);
    }
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Invalid Date";

      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      return "Invalid Date";
    }
  };

  const formatTime = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Invalid Time";

      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } catch (error) {
      return "Invalid Time";
    }
  };

  // Get status badge style
  const getStatusBadgeStyle = (status) => {
    const config = getStatusConfig(status);
    return `${config.bgColor} ${config.textColor} ${config.borderColor}`;
  };

  return (
    <div className="p-3 sm:p-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold bg-blue-600 bg-clip-text text-transparent">
            All Bookings
          </h1>
          <p className="text-gray-600 text-sm sm:text-base mt-1">
            Manage and view all customer bookings
          </p>
        </div>

        {/* Update Message Banner */}
        {updateMessage.text && (
          <div
            className={`mb-4 p-4 rounded-xl border ${
              updateMessage.type === "success"
                ? "bg-green-50 border-green-200 text-green-700"
                : "bg-red-50 border-red-200 text-red-700"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {updateMessage.type === "success" ? (
                  <MdCheck className="text-green-600" size={20} />
                ) : (
                  <MdClose className="text-red-600" size={20} />
                )}
                <span className="font-medium">{updateMessage.text}</span>
              </div>
              <button
                onClick={() => setUpdateMessage({ type: "", text: "" })}
                className="text-gray-400 hover:text-gray-600"
              >
                <MdClose size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4 mb-8">
          {/* Total Bookings Card */}
          <div className="bg-blue-500 rounded-2xl p-4 relative overflow-hidden group transform hover:scale-105 transition-all duration-500 hover:shadow-2xl shadow-lg">
            <div className="absolute -top-8 -right-8 w-24 h-24 bg-white/10 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-white/5 rounded-full"></div>
            <div className="absolute inset-0 bg-white/5 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

            <div className="flex items-center justify-between relative z-10">
              <div>
                <p className="text-blue-100 text-xs font-medium mb-1 tracking-wide">
                  Total Bookings
                </p>
                <p className="text-2xl font-bold text-white mb-1 drop-shadow-lg">
                  {totalBookings}
                </p>
                <div className="flex items-center gap-1">
                  <span className="text-blue-200 text-xs bg-white/10 px-1.5 py-0.5 rounded-full">
                    All time
                  </span>
                </div>
              </div>
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
                <MdCalendarToday className="text-white text-xl" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white/40 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
          </div>

          {/* Status Cards */}
          {[
            {
              value: "pending",
              label: "Pending",
              color: "bg-amber-500",
              icon: <MdSchedule className="text-xl" />,
              description: "Awaiting confirmation",
              iconBg: "bg-amber-600/20",
              count: pendingStatus,
            },
            {
              value: "confirmed",
              label: "Confirmed",
              color: "bg-green-500",
              icon: <MdCheckCircle className="text-xl" />,
              description: "Bookings confirmed",
              iconBg: "bg-green-600/20",
              count: confirmedStatus,
            },
            {
              value: "rejected",
              label: "Rejected",
              color: "bg-red-500",
              icon: <MdCancel className="text-xl" />,
              description: "Bookings declined",
              iconBg: "bg-red-600/20",
              count: rejectedStatus,
            },
            {
              value: "cancelled",
              label: "Cancelled",
              color: "bg-gray-500",
              icon: <MdClose className="text-xl" />,
              description: "Bookings cancelled",
              iconBg: "bg-gray-600/20",
              count: cancelledStatus,
            },
            {
              value: "expire",
              label: "Expired",
              color: "bg-orange-500",
              icon: <MdTimerOff className="text-xl" />,
              description: "Bookings expired",
              iconBg: "bg-orange-600/20",
              count: expiredStatus,
            },
            {
              value: "completed",
              label: "Completed",
              color: "bg-purple-500",
              icon: <MdDoneAll className="text-xl" />,
              description: "Finished trips",
              iconBg: "bg-purple-600/20",
              count: completedStatus,
            },
          ].map((status) => {
            const count = bookings.filter(
              (b) => b.bookingStatus?.toLowerCase() === status.value
            ).length;
            const percentage =
              bookings.length > 0
                ? ((count / bookings.length) * 100).toFixed(1)
                : 0;

            return (
              <div
                key={status.value}
                className={`${status.color} rounded-2xl p-4 relative overflow-hidden group transform hover:scale-105 transition-all duration-500 hover:shadow-2xl shadow-lg lg:col-span-1 xl:col-span-1`}
              >
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-white/10 rounded-full"></div>
                <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-white/5 rounded-full"></div>
                <div className="absolute inset-0 bg-white/10 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                <div className="flex items-center justify-between relative z-10">
                  <div className="flex-1">
                    <p className="text-white/90 text-xs font-semibold mb-1 tracking-wide uppercase">
                      {status.label}
                    </p>
                    <p className="text-xl lg:text-2xl xl:text-2xl font-bold text-white mb-2 drop-shadow-lg">
                      {status.count}
                    </p>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-white/80 text-xs font-medium">
                          Progress
                        </span>
                        <span className="text-white text-xs font-bold bg-white/20 px-1.5 py-0.5 rounded-full">
                          {percentage}%
                        </span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-1.5 shadow-inner">
                        <div
                          className="bg-white h-1.5 rounded-full shadow-lg transition-all duration-1000 ease-out"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`p-3 rounded-xl backdrop-blur-sm group-hover:scale-110 transition-all duration-300 ml-2 shadow-lg ${status.iconBg} lg:p-4 xl:p-4`}
                  >
                    {status.icon}
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-white/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            );
          })}
        </div>

        {/* Search and Filter Section */}
        <div className="rounded-2xl shadow-lg border border-gray-100/80 p-4 sm:p-6 mb-4 sm:mb-6 backdrop-blur-sm bg-white/95">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search Input - Increased width on lg screens */}
            <div className="relative flex-1 w-full lg:max-w-2xl xl:max-w-3xl">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MdSearch className="text-gray-400" size={20} />
              </div>
              <input
                type="text"
                placeholder="Search by name, phone, or email..."
                className="pl-10 pr-4 py-3 w-full border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-sm bg-white shadow-sm hover:shadow-md focus:shadow-lg"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
              {/* Loader inside search bar */}
              {isLoading && <SubtleSpinner />}
              {/* Animated focus indicator */}
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-focus-within:w-full"></div>
            </div>

            {/* Filter Controls */}
            <div className="flex gap-3 w-full lg:w-auto">
              {/* Mobile Filter Toggle */}
              <button
                className="flex lg:hidden items-center gap-2 px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 rounded-xl hover:from-gray-100 hover:to-gray-200 active:scale-95 transition-all duration-300 text-sm font-medium border border-gray-200 shadow-sm hover:shadow-md"
                onClick={() => setShowFilters(!showFilters)}
              >
                {showFilters ? (
                  <MdClose size={18} className="text-red-500" />
                ) : (
                  <MdFilterList size={18} className="text-blue-500" />
                )}
                {showFilters ? "Close" : "Filters"}
              </button>

              {/* Filter Dropdown */}
              <div
                className={`${
                  showFilters ? "flex" : "hidden"
                } lg:flex relative`}
              >
                <div className="relative group">
                  <select
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full bg-white text-sm font-medium shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-300 appearance-none cursor-pointer pr-10"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="All">All Statuses</option>
                    {statusOptions.map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                  {/* Custom dropdown arrow */}
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <div className="w-2 h-2 border-r-2 border-b-2 border-gray-400 transform rotate-45 transition-transform duration-300 group-hover:translate-y-0.5"></div>
                  </div>
                  {/* Animated border */}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-focus-within:w-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MdCalendarToday className="text-gray-400 text-3xl" />
            </div>
            <div className="text-gray-500 text-lg font-medium mb-2">
              {searchTerm || statusFilter !== "All"
                ? "No matching bookings found"
                : "No bookings found"}
            </div>
            <p className="text-gray-400 max-w-md mx-auto">
              {searchTerm || statusFilter !== "All"
                ? "Try adjusting your search criteria or filters."
                : "When bookings are made, they will appear here."}
            </p>
            {(searchTerm || statusFilter !== "All") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("All");
                }}
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors text-sm font-medium"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
              {/* Responsive Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <tr>
                      <th className="px-4 py-4 text-left font-semibold text-gray-700 whitespace-nowrap text-xs sm:text-sm">
                        GUEST
                      </th>
                      <th className="px-4 py-4 text-left font-semibold text-gray-700 whitespace-nowrap text-xs sm:text-sm hidden lg:table-cell">
                        CONTACT
                      </th>
                      <th className="px-4 py-4 text-left font-semibold text-gray-700 whitespace-nowrap text-xs sm:text-sm">
                        GUESTS
                      </th>
                      <th className="px-4 py-4 text-left font-semibold text-gray-700 whitespace-nowrap text-xs sm:text-sm hidden md:table-cell">
                        DATE & TIME
                      </th>
                      <th className="px-4 py-4 text-left font-semibold text-gray-700 whitespace-nowrap text-xs sm:text-sm">
                        STATUS
                      </th>
                      <th className="px-4 py-4 text-left font-semibold text-gray-700 whitespace-nowrap text-xs sm:text-sm">
                        TOTAL
                      </th>
                      <th className="px-4 py-4 text-left font-semibold text-gray-700 whitespace-nowrap text-xs sm:text-sm">
                        ACTION
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {bookings.map((item) => (
                      <tr
                        key={item._id}
                        className="hover:bg-gray-50 transition-all duration-200 group"
                      >
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold mr-3 text-sm">
                              {item.fullName?.charAt(0) || "G"}
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900 text-sm">
                                {item.fullName || "Guest"}
                              </div>
                              <div className="text-xs text-gray-500 lg:hidden mt-1">
                                {item.phoneNumber || "N/A"}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-gray-700 whitespace-nowrap hidden lg:table-cell text-sm">
                          <div className="flex items-center gap-2">
                            <MdPhone className="text-gray-400" size={14} />
                            {item.phoneNumber || "N/A"}
                          </div>
                          {item.email && (
                            <div className="flex items-center gap-2 mt-1">
                              <MdEmail className="text-gray-400" size={12} />
                              <span className="text-xs text-gray-500 truncate max-w-[150px]">
                                {item.email}
                              </span>
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-200">
                            <MdPerson size={12} />
                            {item.totalMembers || 0}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-gray-700 whitespace-nowrap hidden md:table-cell text-sm">
                          <div className="flex items-center gap-2">
                            <MdCalendarToday
                              className="text-gray-400"
                              size={14}
                            />
                            {formatDate(item.bookingDate)}
                          </div>
                          <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                            <MdAccessTime size={12} />
                            {formatTime(item.bookingDate)}
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${getStatusBadgeStyle(
                              item.bookingStatus
                            )}`}
                          >
                            {getStatusConfig(item.bookingStatus).label}
                          </span>
                        </td>
                        <td className="px-4 py-4 font-semibold text-gray-900 whitespace-nowrap text-sm">
                          <div className="flex items-center gap-1">
                            <MdAttachMoney
                              className="text-green-600"
                              size={16}
                            />
                            {item.bookingTotal || 0}
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="relative">
                            <select
                              value={item.bookingStatus || "pending"}
                              onChange={(e) =>
                                updateBookingStatus(item._id, e.target.value)
                              }
                              disabled={updatingStatus === item._id}
                              className={`appearance-none inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border cursor-pointer transition-all bg-white border-gray-300 text-gray-700 hover:bg-gray-50 ${
                                updatingStatus === item._id
                                  ? "opacity-50 cursor-not-allowed"
                                  : "hover:opacity-80"
                              }`}
                            >
                              {statusOptions.map((status) => (
                                <option key={status.value} value={status.value}>
                                  {status.label}
                                </option>
                              ))}
                            </select>
                            {updatingStatus === item._id && (
                              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 rounded-full">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* Pagination Component */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalBookings}
                itemsPerPage={bookingsPerPage}
                currentItems={bookings}
                onPageChange={(page) => setCurrentPage(page)}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AllBookings;

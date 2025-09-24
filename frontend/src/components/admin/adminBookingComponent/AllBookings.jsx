import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  MdInfo,
  MdFilterList,
  MdSearch,
  MdClose,
  MdMoreVert,
  MdEdit,
  MdVisibility,
  MdCalendarToday,
  MdPerson,
  MdPhone,
  MdAttachMoney,
  MdAccessTime,
  MdCheck,
  MdEmail,
  MdNotes,
  MdSchedule,
  MdCheckCircle,
  MdCancel,
  MdDoneAll,
} from "react-icons/md";
import { GiConfirmed, GiSandsOfTime } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [activeActionMenu, setActiveActionMenu] = useState(null);
  const [editForm, setEditForm] = useState({
    bookingStatus: "",
    totalMembers: 0,
    bookingTotal: 0,
    specialRequests: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [updateMessage, setUpdateMessage] = useState({ type: "", text: "" });
  const [updatingStatus, setUpdatingStatus] = useState(null); // Track which booking is being updated
  const token = useSelector((state) => state.auth.token);
  const actionMenuRef = useRef(null);

  // Enhanced status options with better configuration
  const statusOptions = [
    {
      value: "pending",
      label: "Pending",
      color: "yellow",
      icon: "⏳",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-700",
      borderColor: "border-yellow-200",
    },
    {
      value: "confirmed",
      label: "Confirmed",
      color: "green",
      icon: "✅",
      bgColor: "bg-green-50",
      textColor: "text-green-700",
      borderColor: "border-green-200",
    },
    {
      value: "rejected",
      label: "Rejected",
      color: "red",
      icon: "❌",
      bgColor: "bg-red-50",
      textColor: "text-red-700",
      borderColor: "border-red-200",
    },
    // {
    //   value: "completed",
    //   label: "Completed",
    //   color: "blue",
    //   icon: "✓",
    //   bgColor: "bg-blue-50",
    //   textColor: "text-blue-700",
    //   borderColor: "border-blue-200",
    // },
  ];

  const getStatusConfig = (status) => {
    return (
      statusOptions.find((opt) => opt.value === status?.toLowerCase()) ||
      statusOptions[0]
    );
  };

  const fetchBookings = async () => {
    try {
      setIsInitialLoading(true);
      const response = await axios.get(
        `http://localhost:8000/api/get-bookings`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Cache-Control": "no-cache",
          },
        }
      );
      setBookings(response.data.booking || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setUpdateMessage({
        type: "error",
        text: "Failed to load bookings. Please try again.",
      });
    } finally {
      setIsInitialLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Close action menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        actionMenuRef.current &&
        !actionMenuRef.current.contains(event.target)
      ) {
        setActiveActionMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle modal outside clicks and ESC key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.keyCode === 27) {
        closeModals();
      }
    };

    const handleOutsideClick = (event) => {
      if (
        (showDetailModal || showActionModal) &&
        event.target.classList.contains("fixed")
      ) {
        closeModals();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [showDetailModal, showActionModal]);

  // Handle body overflow when modals are open
  useEffect(() => {
    if (showDetailModal || showActionModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showDetailModal, showActionModal]);

  const openDetailModal = (booking) => {
    setSelectedBooking(booking);
    setShowDetailModal(true);
    setActiveActionMenu(null);
  };

  const openActionModal = (booking) => {
    setSelectedBooking(booking);
    setEditForm({
      bookingStatus: booking.bookingStatus || "pending",
      totalMembers: booking.totalMembers || 0,
      bookingTotal: booking.bookingTotal || 0,
      specialRequests: booking.specialRequests || "",
    });
    setShowActionModal(true);
    setActiveActionMenu(null);
    setUpdateMessage({ type: "", text: "" });
  };

  const closeModals = () => {
    setShowDetailModal(false);
    setShowActionModal(false);
    setSelectedBooking(null);
    setEditForm({
      bookingStatus: "",
      totalMembers: 0,
      bookingTotal: 0,
      specialRequests: "",
    });
    setUpdateMessage({ type: "", text: "" });
  };

  const toggleActionMenu = (bookingId) => {
    setActiveActionMenu(activeActionMenu === bookingId ? null : bookingId);
  };

  const handleEditChange = (field, value) => {
    setEditForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Quick status update function
  const updateBookingStatus = async (bookingId, newStatus) => {
    if (!bookingId) return;

    setUpdatingStatus(bookingId);
    setUpdateMessage({ type: "", text: "" });

    try {
      const response = await axios.put(
        `http://localhost:8000/api/update-booking/${bookingId}`,
        {
          bookingStatus: newStatus,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        // Update the local state
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking._id === bookingId
              ? { ...booking, bookingStatus: newStatus }
              : booking
          )
        );

        // Show success message
        setUpdateMessage({
          type: "success",
          text: `Status updated to ${
            newStatus.charAt(0).toUpperCase() + newStatus.slice(1)
          }!`,
        });

        // Clear message after 3 seconds
        setTimeout(() => {
          setUpdateMessage({ type: "", text: "" });
        }, 3000);
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

  const updateBookingDetails = async () => {
    if (!selectedBooking) return;

    setIsLoading(true);
    setUpdateMessage({ type: "", text: "" });

    try {
      const response = await axios.put(
        `http://localhost:8000/api/update-booking/${selectedBooking._id}`,
        {
          bookingStatus: editForm.bookingStatus,
          totalMembers: editForm.totalMembers,
          bookingTotal: editForm.bookingTotal,
          specialRequests: editForm.specialRequests,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setUpdateMessage({
          type: "success",
          text: "Booking updated successfully!",
        });

        // Update the local state
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking._id === selectedBooking._id
              ? { ...booking, ...editForm }
              : booking
          )
        );

        // Close modal after 2 seconds
        setTimeout(() => {
          setShowActionModal(false);
          setSelectedBooking(null);
        }, 2000);
      }
    } catch (error) {
      console.error("Error updating booking:", error);
      setUpdateMessage({
        type: "error",
        text: "Failed to update booking. Please try again.",
      });
    } finally {
      setIsLoading(false);
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

  const formatDateTime = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Invalid Date/Time";

      return date.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } catch (error) {
      return "Invalid Date/Time";
    }
  };

  // Get status badge style
  const getStatusBadgeStyle = (status) => {
    const config = getStatusConfig(status);
    return `${config.bgColor} ${config.textColor} ${config.borderColor}`;
  };

  // Get status icon
  const getStatusIcon = (status) => {
    return getStatusConfig(status).icon;
  };

  // Filter bookings based on search term and status
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.phoneNumber?.includes(searchTerm) ||
      booking.email?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      booking.bookingStatus?.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
          {/* Total Bookings Card */}
          <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 rounded-2xl p-6 relative overflow-hidden group transform hover:scale-105 transition-all duration-500 hover:shadow-2xl shadow-lg">
            {/* Animated background elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/5 rounded-full"></div>

            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

            <div className="flex items-center justify-between relative z-10">
              <div>
                <p className="text-blue-100 text-sm font-medium mb-1 tracking-wide">
                  Total Bookings
                </p>
                <p className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
                  {bookings.length}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-blue-200 text-xs bg-white/10 px-2 py-1 rounded-full">
                    All time
                  </span>
                  <div className="w-16 bg-white/20 rounded-full h-1">
                    <div className="bg-white h-1 rounded-full w-full"></div>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
                <MdCalendarToday className="text-white text-2xl" />
              </div>
            </div>

            {/* Animated bottom border */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
          </div>

          {/* Status Cards */}
          {[
            {
              value: "pending",
              label: "Pending",
              gradient: "from-amber-400 to-orange-500",
              icon: <MdSchedule className="text-2xl" />,
              description: "Awaiting confirmation",
              iconBg: "bg-amber-500/20",
            },
            {
              value: "confirmed",
              label: "Confirmed",
              gradient: "from-emerald-400 to-green-600",
              icon: <MdCheckCircle className="text-2xl" />,
              description: "Bookings confirmed",
              iconBg: "bg-emerald-500/20",
            },
            {
              value: "rejected",
              label: "Rejected",
              gradient: "from-rose-500 to-red-600",
              icon: <MdCancel className="text-2xl" />,
              description: "Bookings declined",
              iconBg: "bg-rose-500/20",
            },
            {
              value: "completed",
              label: "Completed",
              gradient: "from-purple-500 to-indigo-700",
              icon: <MdDoneAll className="text-2xl" />,
              description: "Finished trips",
              iconBg: "bg-purple-500/20",
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
                className={`bg-gradient-to-br ${status.gradient} rounded-2xl p-6 relative overflow-hidden group transform hover:scale-105 transition-all duration-500 hover:shadow-2xl shadow-lg`}
              >
                {/* Floating background elements */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/10 rounded-full"></div>
                <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-white/5 rounded-full"></div>

                {/* Shine effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                <div className="flex items-center justify-between relative z-10">
                  <div className="flex-1">
                    <p className="text-white/90 text-sm font-semibold mb-2 tracking-wide uppercase">
                      {status.label}
                    </p>
                    <p className="text-4xl font-bold text-white mb-3 drop-shadow-lg">
                      {count}
                    </p>

                    {/* Enhanced progress bar */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-white/80 text-xs font-medium">
                          Progress
                        </span>
                        <span className="text-white text-xs font-bold bg-white/20 px-2 py-1 rounded-full">
                          {percentage}%
                        </span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2.5 shadow-inner">
                        <div
                          className="bg-white h-2.5 rounded-full shadow-lg transition-all duration-1000 ease-out"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced icon container */}
                  <div
                    className={`p-4 rounded-2xl backdrop-blur-sm group-hover:scale-110 transition-all duration-300 ml-4 shadow-lg ${status.iconBg}`}
                  >
                    {status.icon}
                  </div>
                </div>

                {/* Hover description */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 rounded-2xl flex items-center justify-center">
                  <span className="text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-black/30 px-3 py-2 rounded-full backdrop-blur-sm">
                    {status.description}
                  </span>
                </div>

                {/* Animated border */}
                <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-white/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            );
          })}
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 mb-4 sm:mb-6 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="relative flex-1 min-w-0 w-full lg:max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MdSearch className="text-gray-400" size={20} />
              </div>
              <input
                type="text"
                placeholder="Search by name, phone, or email..."
                className="pl-10 pr-4 py-3 w-full border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all text-sm sm:text-base bg-gray-50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-3 w-full lg:w-auto">
              <button
                className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors lg:hidden text-sm font-medium"
                onClick={() => setShowFilters(!showFilters)}
              >
                {showFilters ? (
                  <MdClose size={18} />
                ) : (
                  <MdFilterList size={18} />
                )}
                {showFilters ? "Close" : "Filters"}
              </button>

              <div
                className={`${
                  showFilters ? "flex" : "hidden"
                } lg:flex flex-col lg:flex-row gap-3 w-full lg:w-auto`}
              >
                <div className="relative">
                  <select
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 w-full appearance-none bg-gray-50 text-sm font-medium"
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
                </div>
              </div>
            </div>
          </div>
        </div>

        {isInitialLoading ? (
          <div className="flex justify-center items-center py-12 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MdCalendarToday className="text-gray-400 text-3xl" />
            </div>
            <div className="text-gray-500 text-lg font-medium mb-2">
              {bookings.length === 0
                ? "No bookings found"
                : "No matching bookings found"}
            </div>
            <p className="text-gray-400 max-w-md mx-auto">
              {bookings.length === 0
                ? "When bookings are made, they will appear here."
                : "Try adjusting your search criteria or filters."}
            </p>
          </div>
        ) : (
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
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredBookings.map((item, index) => (
                    <tr
                      key={item._id}
                      className="hover:bg-gray-50 transition-all duration-200 group"
                    >
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 bg-gradient-to-br from-violet-500 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold mr-3 text-sm">
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
                          {formatDate(item.createdAt)}
                        </div>
                        <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                          <MdAccessTime size={12} />
                          {formatTime(item.createdAt)}
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
                            className={`appearance-none inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border cursor-pointer transition-all ${getStatusBadgeStyle(
                              item.bookingStatus
                            )} ${
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
                      <td className="px-4 py-4 font-semibold text-gray-900 whitespace-nowrap text-sm">
                        <div className="flex items-center gap-1">
                          <MdAttachMoney className="text-green-600" size={16} />
                          {item.bookingTotal || 0}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="relative" ref={actionMenuRef}>
                          <button
                            onClick={() => toggleActionMenu(item._id)}
                            className="p-2 text-gray-400 hover:text-violet-600 hover:bg-violet-50 rounded-xl transition-all duration-200"
                            title="Actions"
                          >
                            <MdMoreVert size={18} />
                          </button>

                          {activeActionMenu === item._id && (
                            <div className="absolute right-0 top-10 z-10 bg-white rounded-xl shadow-lg border border-gray-200 min-w-32 py-2 transform -translate-x-2">
                              <button
                                onClick={() => openDetailModal(item)}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                              >
                                <MdVisibility
                                  className="text-blue-600"
                                  size={16}
                                />
                                View Details
                              </button>
                              <button
                                onClick={() => openActionModal(item)}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                              >
                                <MdEdit className="text-green-600" size={16} />
                                Edit Booking
                              </button>
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
        )}

        <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl text-sm text-blue-700 lg:hidden border border-blue-100">
          <p className="flex items-center justify-center gap-2">
            <span>💡</span>
            Swipe horizontally to view all table columns
          </p>
        </div>

        {/* Enhanced Booking Detail Modal */}
        {showDetailModal && selectedBooking && (
          <div
            className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-3 sm:p-4"
            onClick={closeModals}
          >
            <div
              className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800">
                  Booking Details
                </h2>
                <button
                  onClick={closeModals}
                  className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100"
                >
                  <MdClose size={20} />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Guest Information */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <MdPerson className="text-blue-600" size={18} />
                    Guest Information
                  </h3>
                  <div className="flex items-center">
                    <div className="h-16 w-16 flex-shrink-0 bg-gradient-to-br from-violet-500 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-xl mr-4">
                      {selectedBooking.fullName?.charAt(0) || "G"}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {selectedBooking.fullName || "Guest"}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                        <p className="text-sm text-gray-600 flex items-center gap-2">
                          <MdPhone size={14} />
                          {selectedBooking.phoneNumber || "N/A"}
                        </p>
                        {selectedBooking.email && (
                          <p className="text-sm text-gray-600 flex items-center gap-2">
                            <MdEmail size={14} />
                            {selectedBooking.email}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Booking Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="text-xs text-gray-500 font-medium mb-2">
                      Guest Size
                    </p>
                    <p className="font-semibold text-sm flex items-center gap-2">
                      <MdPerson size={16} />
                      {selectedBooking.totalMembers || 0} people
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="text-xs text-gray-500 font-medium mb-2">
                      Total Amount
                    </p>
                    <p className="font-semibold text-sm flex items-center gap-2">
                      <MdAttachMoney size={16} />$
                      {selectedBooking.bookingTotal || 0}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="text-xs text-gray-500 font-medium mb-2">
                      Booking Date
                    </p>
                    <p className="font-semibold text-sm flex items-center gap-2">
                      <MdCalendarToday size={16} />
                      {formatDate(selectedBooking.createdAt)}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="text-xs text-gray-500 font-medium mb-2">
                      Booking Time
                    </p>
                    <p className="font-semibold text-sm flex items-center gap-2">
                      <MdAccessTime size={16} />
                      {formatTime(selectedBooking.createdAt)}
                    </p>
                  </div>
                </div>

                {/* Status Section */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <p className="text-xs text-gray-500 font-medium mb-2">
                    Current Status
                  </p>
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border ${getStatusBadgeStyle(
                        selectedBooking.bookingStatus
                      )}`}
                    >
                      <span className="text-sm">
                        {getStatusIcon(selectedBooking.bookingStatus)}
                      </span>
                      {selectedBooking.bookingStatus?.charAt(0).toUpperCase() +
                        selectedBooking.bookingStatus?.slice(1) || "Pending"}
                    </span>
                    <button
                      onClick={() => {
                        setShowDetailModal(false);
                        setTimeout(() => openActionModal(selectedBooking), 300);
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      Change Status
                    </button>
                  </div>
                </div>

                {/* Special Requests */}
                {selectedBooking.specialRequests && (
                  <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
                    <p className="text-xs text-yellow-700 font-medium mb-2 flex items-center gap-2">
                      <MdNotes size={14} />
                      Special Requests
                    </p>
                    <p className="text-sm text-yellow-800">
                      {selectedBooking.specialRequests}
                    </p>
                  </div>
                )}

                {/* Booking ID */}
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 font-medium mb-2">
                    Booking ID
                  </p>
                  <p className="font-mono text-xs text-gray-700 break-all bg-gray-50 p-3 rounded-lg">
                    {selectedBooking._id}
                  </p>
                </div>

                {/* Additional Information */}
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                  <p className="text-xs text-blue-700 font-medium mb-1">
                    Additional Information
                  </p>
                  <p className="text-xs text-blue-600">
                    Created: {formatDateTime(selectedBooking.createdAt)}
                    {selectedBooking.updatedAt &&
                      selectedBooking.updatedAt !== selectedBooking.createdAt &&
                      ` • Updated: ${formatDateTime(
                        selectedBooking.updatedAt
                      )}`}
                  </p>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 flex gap-3">
                <button
                  onClick={closeModals}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowDetailModal(false);
                    setTimeout(() => openActionModal(selectedBooking), 300);
                  }}
                  className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-medium flex items-center justify-center gap-2"
                >
                  <MdEdit size={18} />
                  Edit Booking
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Edit Booking Modal */}
        {showActionModal && selectedBooking && (
          <div
            className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-3 sm:p-4"
            onClick={closeModals}
          >
            <div
              className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800">
                  Edit Booking
                </h2>
                <button
                  onClick={closeModals}
                  className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100"
                >
                  <MdClose size={20} />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="text-center py-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <MdEdit className="text-white text-2xl" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-lg">
                    Edit Booking for {selectedBooking.fullName || "Guest"}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    Modify booking details and status
                  </p>
                </div>

                {/* Update Message */}
                {updateMessage.text && (
                  <div
                    className={`p-3 rounded-lg text-sm font-medium ${
                      updateMessage.type === "success"
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-red-50 text-red-700 border border-red-200"
                    }`}
                  >
                    {updateMessage.text}
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Booking Status
                    </label>
                    <select
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-gray-50 text-sm"
                      value={editForm.bookingStatus}
                      onChange={(e) =>
                        handleEditChange("bookingStatus", e.target.value)
                      }
                    >
                      {statusOptions.map((status) => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Guest Count
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="50"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-gray-50 text-sm"
                      value={editForm.totalMembers}
                      onChange={(e) =>
                        handleEditChange(
                          "totalMembers",
                          parseInt(e.target.value) || 0
                        )
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Amount ($)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-gray-50 text-sm"
                      value={editForm.bookingTotal}
                      onChange={(e) =>
                        handleEditChange(
                          "bookingTotal",
                          parseFloat(e.target.value) || 0
                        )
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Special Requests
                    </label>
                    <textarea
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-gray-50 text-sm resize-none"
                      value={editForm.specialRequests}
                      onChange={(e) =>
                        handleEditChange("specialRequests", e.target.value)
                      }
                      placeholder="Any special requests or notes..."
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 flex gap-3">
                <button
                  onClick={closeModals}
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={updateBookingDetails}
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-medium disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      Updating...
                    </>
                  ) : (
                    <>
                      <MdCheck size={18} />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBookings;

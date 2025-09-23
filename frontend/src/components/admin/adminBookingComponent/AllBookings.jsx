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
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [updateMessage, setUpdateMessage] = useState({ type: "", text: "" });
  const token = useSelector((state) => state.auth.token);
  const actionMenuRef = useRef(null);

  const statusOptions = [
    { value: "pending", label: "Pending", color: "yellow", icon: "⏳" },
    { value: "confirmed", label: "Confirmed", color: "green", icon: "✅" },
    { value: "rejected", label: "Rejected", color: "red", icon: "❌" },
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

  const updateBookingStatus = async () => {
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
      });
    } catch (error) {
      return "Invalid Time";
    }
  };

  // Get status badge style
  const getStatusBadgeStyle = (status) => {
    const config = getStatusConfig(status);
    switch (config.color) {
      case "green":
        return "bg-green-50 text-green-700 border-green-200";
      case "yellow":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "red":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    return getStatusConfig(status).icon;
  };

  // Filter bookings based on search term and status
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.phoneNumber?.includes(searchTerm);

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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-800">
                  {bookings.length}
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <MdCalendarToday className="text-blue-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Confirmed</p>
                <p className="text-2xl font-bold text-green-600">
                  {
                    bookings.filter(
                      (b) => b.bookingStatus?.toLowerCase() === "confirmed"
                    ).length
                  }
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <span className="text-green-600 text-xl">
                  <GiConfirmed />
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {
                    bookings.filter(
                      (b) => b.bookingStatus?.toLowerCase() === "pending"
                    ).length
                  }
                </p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <span className="text-yellow-600 text-xl">
                  <GiSandsOfTime />
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-red-600">
                  {
                    bookings.filter(
                      (b) => b.bookingStatus?.toLowerCase() === "rejected"
                    ).length
                  }
                </p>
              </div>
              <div className="p-3 bg-red-50 rounded-lg">
                <span className="text-red-600 text-xl">
                  <RxCross1 />
                </span>
              </div>
            </div>
          </div>
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
                placeholder="Search by name or phone..."
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
                    <option value="confirmed">Confirmed</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
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
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${getStatusBadgeStyle(
                            item.bookingStatus
                          )}`}
                        >
                          <span className="text-xs">
                            {getStatusIcon(item.bookingStatus)}
                          </span>
                          {item.bookingStatus?.charAt(0).toUpperCase() +
                            item.bookingStatus?.slice(1) || "Pending"}
                        </span>
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

                          {/* Action Menu Dropdown */}
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

        {/* Mobile view tip */}
        <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl text-sm text-blue-700 lg:hidden border border-blue-100">
          <p className="flex items-center justify-center gap-2">
            <span>💡</span>
            Swipe horizontally to view all table columns
          </p>
        </div>

        {/* Booking Detail Modal */}
        {showDetailModal && selectedBooking && (
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
                {/* Guest Info */}
                <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                  <div className="h-12 w-12 flex-shrink-0 bg-gradient-to-br from-violet-500 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-lg mr-4">
                    {selectedBooking.fullName?.charAt(0) || "G"}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {selectedBooking.fullName || "Guest"}
                    </h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                      <MdPhone size={14} />
                      {selectedBooking.phoneNumber || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Booking Details Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 font-medium">
                      Guest Size
                    </p>
                    <p className="font-semibold text-sm flex items-center gap-1 mt-1">
                      <MdPerson size={14} />
                      {selectedBooking.totalMembers || 0} people
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 font-medium">
                      Total Amount
                    </p>
                    <p className="font-semibold text-sm flex items-center gap-1 mt-1">
                      <MdAttachMoney size={14} />$
                      {selectedBooking.bookingTotal || 0}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 font-medium">
                      Booking Date
                    </p>
                    <p className="font-semibold text-sm flex items-center gap-1 mt-1">
                      <MdCalendarToday size={14} />
                      {formatDate(selectedBooking.createdAt)}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 font-medium">
                      Booking Time
                    </p>
                    <p className="font-semibold text-sm flex items-center gap-1 mt-1">
                      <MdAccessTime size={14} />
                      {formatTime(selectedBooking.createdAt)}
                    </p>
                  </div>
                </div>

                {/* Status */}
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-xs text-gray-500 font-medium mb-2">
                    Status
                  </p>
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
                </div>

                {/* Booking ID */}
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 font-medium mb-2">
                    Booking ID
                  </p>
                  <p className="font-mono text-xs text-gray-700 break-all bg-gray-50 p-3 rounded-lg">
                    {selectedBooking._id}
                  </p>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200">
                <button
                  onClick={closeModals}
                  className="w-full px-4 py-3 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-xl hover:from-violet-700 hover:to-blue-700 transition-all duration-200 font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Booking Modal */}
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
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Guest Count
                    </label>
                    <input
                      type="number"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-gray-50 text-sm"
                      value={editForm.totalMembers}
                      onChange={(e) =>
                        handleEditChange(
                          "totalMembers",
                          parseInt(e.target.value)
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
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-gray-50 text-sm"
                      value={editForm.bookingTotal}
                      onChange={(e) =>
                        handleEditChange(
                          "bookingTotal",
                          parseFloat(e.target.value)
                        )
                      }
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
                  onClick={updateBookingStatus}
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

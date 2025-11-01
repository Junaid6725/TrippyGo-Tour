import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  MdVisibility,
  MdCalendarToday,
  MdPerson,
  MdPhone,
  MdLocationOn,
  MdAccessTime,
  MdHotel,
  MdPendingActions,
  MdCancel,
  MdCheckCircle,
} from "react-icons/md";
import Swal from "sweetalert2";
import { FaDollarSign } from "react-icons/fa";
import Pagination from "../shared/Pagination";

const UserBooking = () => {
  const [userBookings, setUserBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalUserBookings, setTotalUserBookings] = useState("");
  const [expandedBooking, setExpandedBooking] = useState(null);
  const usersPerPage = 5;

  const token = useSelector((state) => state.auth.token);

  const fetchUserBookings = async (page = 1) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:8000/api/user-bookings?page=${page}&limit=${usersPerPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUserBookings(response.data.bookings || []);
      setTotalPages(response.data.totalPages || 1);
      setCurrentPage(response.data.page || page);
      setTotalUserBookings(response.data.total);
    } catch (error) {
      console.log("Error fetching bookings:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load bookings",
        background: "#ffffff",
        color: "#1f2937",
        confirmButtonColor: "#3b82f6",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserBookings(currentPage);
  }, [currentPage]);

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Format date with year for details
  const formatDateWithYear = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      weekday: "short",
    });
  };

  // Get status color scheme
  const getStatusColors = (status) => {
    switch (status) {
      case "confirmed":
        return {
          bg: "bg-green-50",
          text: "text-green-700",
          border: "border-green-200",
          dot: "bg-green-500",
          icon: "✓",
        };
      case "pending":
        return {
          bg: "bg-yellow-50",
          text: "text-yellow-700",
          border: "border-yellow-200",
          dot: "bg-yellow-500",
          icon: "⏳",
        };
      case "cancelled":
        return {
          bg: "bg-red-50",
          text: "text-red-700",
          border: "border-red-200",
          dot: "bg-red-500",
          icon: "✕",
        };
      default:
        return {
          bg: "bg-gray-50",
          text: "text-gray-700",
          border: "border-gray-200",
          dot: "bg-gray-500",
          icon: "📅",
        };
    }
  };

  // Toggle mobile view expansion
  const toggleExpandBooking = (bookingId) => {
    setExpandedBooking(expandedBooking === bookingId ? null : bookingId);
  };

  // View booking details in modal
  const viewBookingDetails = (booking) => {
    const statusColors = getStatusColors(booking.bookingStatus);

    Swal.fire({
      width: "auto",
      padding: "4",
      html: `
  <div class="relative bg-white/90 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-lg overflow-hidden">
    <!-- Sticky Header -->
    <div class="sticky top-0 z-40  text-blue-500 text-center py-3 sm:py-4 shadow-md rounded-t-2xl">
      <button type="button" class="absolute right-4 top-3 sm:top-4 text-white/80 hover:text-white transition text-lg sm:text-xl" id="closeModalBtn">✖</button>
      <h2 class="font-bold text-lg sm:text-2xl md:text-3xl tracking-tight">📋 Booking Details</h2>
      <p class="text-xs sm:text-sm bg-white/20 px-3 py-1 mt-1 rounded-full inline-block">
        Booking ID: #${booking._id || "N/A"}
      </p>
    </div>

    <!-- Scrollable Content -->
    <div class="max-h-[65vh] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-gray-100 p-6 sm:p-7 md:p-9 space-y-6">

      <!-- Customer Info -->
      <div class="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 shadow-sm hover:shadow-md transition">
        <h3 class="font-semibold text-blue-800 mb-2 flex items-center gap-2">
          👤 Customer Information
        </h3>
        <div class="text-gray-700 text-sm sm:text-base space-y-1">
          <p><span class="font-medium text-gray-600">Name:</span> ${
            booking.fullName
          }</p>
          <p><span class="font-medium text-gray-600">Email:</span> ${
            booking.email
          }</p>
          <p><span class="font-medium text-gray-600">Phone:</span> ${
            booking.phoneNumber
          }</p>
        </div>
      </div>

      <!-- Booking Info -->
      <div class="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 shadow-sm hover:shadow-md transition">
        <h3 class="font-semibold text-blue-800 mb-2 flex items-center gap-2">
          🕒 Booking Information
        </h3>
        <div class="text-gray-700 text-sm sm:text-base space-y-1">
          <p><span class="font-medium text-gray-600">Duration:</span>
            <span class="text-blue-800 font-semibold">${
              booking.tourId?.duration
            } ${booking.tourId?.duration === 1 ? " day" : " days"}</span>
          </p>
          <p><span class="font-medium text-gray-600">Members:</span> ${
            booking.totalMembers
          }</p>
          <p>
            <span class="font-medium text-gray-600">Status:</span>
            <span class="inline-flex items-center gap-1 px-3 py-1 ${
              statusColors.bg
            } ${statusColors.text} border ${
        statusColors.border
      } rounded-full text-xs sm:text-sm font-semibold shadow-sm">
              ${statusColors.icon} ${
        booking.bookingStatus?.charAt(0).toUpperCase() +
          booking.bookingStatus?.slice(1) || "Pending"
      }
            </span>
          </p>
        </div>
      </div>

      <!-- Stay Period -->
      <div class="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 shadow-sm hover:shadow-md transition">
        <h3 class="font-semibold text-blue-800 mb-3 flex items-center gap-2">
          📅 Stay Period
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm sm:text-base text-gray-700">
          <div class="p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg text-center shadow-sm">
            <p class="text-blue-900 font-bold text-base sm:text-lg">
              ${formatDateWithYear(booking.startDate).split(",")[0]}
            </p>
            <p class="text-gray-700 text-xs">${
              formatDateWithYear(booking.startDate).split(",")[1]
            }</p>
            <p class="text-blue-800 text-xs font-medium mt-1">CHECK-IN</p>
          </div>
          <div class="p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg text-center shadow-sm">
            <p class="text-blue-900 font-bold text-base sm:text-lg">
              ${formatDateWithYear(booking.endDate).split(",")[0]}
            </p>
            <p class="text-gray-700 text-xs">${
              formatDateWithYear(booking.endDate).split(",")[1]
            }</p>
            <p class="text-blue-800 text-xs font-medium mt-1">CHECK-OUT</p>
          </div>
        </div>
      </div>

      <!-- Additional Info -->
      ${
        booking.tourId?.expenditure || booking.tourId?.location
          ? `
      <div class="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 shadow-sm hover:shadow-md transition">
        <h3 class="font-semibold text-blue-800 mb-2 flex items-center gap-2">
          💬 Additional Information
        </h3>
        <div class="text-gray-700 text-sm sm:text-base space-y-1">
          ${
            booking.tourId?.location
              ? `<p><span class="font-medium text-gray-600">Location:</span> ${booking.tourId?.location}</p>`
              : ""
          }
          
          ${
            booking.bookingTotal
              ? `<p><span class="font-medium text-gray-600">Total Expenditure:</span> $ ${booking.bookingTotal}</p>`
              : ""
          }
        </div>
      </div>`
          : ""
      }
    </div>
  </div>
  `,
      showConfirmButton: true,
      confirmButtonText: "Close",
      background: "transparent",
      customClass: {
        popup: `
      rounded-2xl shadow-2xl mx-2 sm:mx-4 md:mx-6
      max-w-sm sm:max-w-md md:max-w-lg w-full
      flex flex-col backdrop-blur-lg animate-fadeIn border border-white/40
    `,
        confirmButton: `
      mt-4 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-800
      hover:from-blue-700 hover:to-blue-900
      text-white rounded-lg font-medium shadow-md
      transition-all duration-300 focus:outline-none
      focus:ring-2 focus:ring-blue-300 text-sm sm:text-base
    `,
        actions: "!mt-4 !mb-3 !gap-2",
      },
      buttonsStyling: false,
      icon: false,
      backdrop: `rgba(0,0,0,0.4)`,
    });

    // manually bind close button (SweetAlert2 close button hidden)
    setTimeout(() => {
      document
        .getElementById("closeModalBtn")
        ?.addEventListener("click", () => Swal.close());
    }, 0);
  };

  return (
    <div className="min-h-screen p-3 xs:p-4 sm:p-5 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Professional Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 sm:gap-4 mb-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <MdHotel className="text-white text-lg sm:text-xl" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                My Bookings
              </h1>
              <p className="text-gray-600 text-xs sm:text-sm">
                Manage and track all your reservations
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        {!isLoading && userBookings.length > 0 && (
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6 mb-6 sm:mb-8">
            {/* Total Bookings */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100/70 rounded-2xl p-4 sm:p-5 shadow-sm border border-blue-200/80 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-200/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-200/80 rounded-xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300">
                    <MdCalendarToday className="text-blue-700 text-xl sm:text-2xl" />
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-extrabold text-gray-900">
                      {userBookings.length}
                    </p>
                    <p className="text-xs sm:text-sm font-medium text-gray-600">
                      Total Bookings
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute top-3 right-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            {/* Confirmed */}
            <div className="bg-gradient-to-br from-green-50 to-green-100/70 rounded-2xl p-4 sm:p-5 shadow-sm border border-green-200/80 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-green-200/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-200/80 rounded-xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300">
                    <MdCheckCircle className="text-green-700 text-xl sm:text-2xl" />
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-extrabold text-gray-900">
                      {
                        userBookings.filter(
                          (b) => b.bookingStatus === "confirmed"
                        ).length
                      }
                    </p>
                    <p className="text-xs sm:text-sm font-medium text-gray-600">
                      Confirmed
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute top-3 right-3">
                <div className="w-2 h-2 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            {/* Pending */}
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100/70 rounded-2xl p-4 sm:p-5 shadow-sm border border-yellow-200/80 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-200/80 rounded-xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300">
                    <MdPendingActions className="text-yellow-700 text-xl sm:text-2xl" />
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-extrabold text-gray-900">
                      {
                        userBookings.filter(
                          (b) => b.bookingStatus === "pending"
                        ).length
                      }
                    </p>
                    <p className="text-xs sm:text-sm font-medium text-gray-600">
                      Pending
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute top-3 right-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            {/* Cancelled */}
            <div className="bg-gradient-to-br from-red-50 to-red-100/70 rounded-2xl p-4 sm:p-5 shadow-sm border border-red-200/80 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-red-200/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-200/80 rounded-xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300">
                    <MdCancel className="text-red-700 text-xl sm:text-2xl" />
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-extrabold text-gray-900">
                      {
                        userBookings.filter(
                          (b) => b.bookingStatus === "cancelled"
                        ).length
                      }
                    </p>
                    <p className="text-xs sm:text-sm font-medium text-gray-600">
                      Cancelled
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute top-3 right-3">
                <div className="w-2 h-2 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16 sm:py-20">
              <div className="relative">
                <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-gray-200 rounded-full"></div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
              </div>
              <p className="text-gray-600 font-medium mt-3 sm:mt-4 text-sm sm:text-base">
                Loading your bookings...
              </p>
            </div>
          ) : (
            <>
              {/* Professional Table - Always visible on all screens */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="py-3 px-3 sm:py-4 sm:px-4 text-left font-semibold text-gray-700 text-xs sm:text-sm uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <MdPerson className="text-gray-500" size={14} />
                          <span>Guest</span>
                        </div>
                      </th>
                      <th className="py-3 px-3 sm:py-4 sm:px-4 text-left font-semibold text-gray-700 text-xs sm:text-sm uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <MdCalendarToday
                            className="text-gray-500"
                            size={12}
                          />
                          <span>Dates</span>
                        </div>
                      </th>
                      <th className="py-3 px-3 sm:py-4 sm:px-4 text-left font-semibold text-gray-700 text-xs sm:text-sm uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <MdAccessTime className="text-gray-500" size={12} />
                          <span>Duration</span>
                        </div>
                      </th>
                      <th className="py-3 px-3 sm:py-4 sm:px-4 text-left font-semibold text-gray-700 text-xs sm:text-sm uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <FaDollarSign className="text-gray-500" size={12} />
                          <span>Expenditure</span>
                        </div>
                      </th>
                      <th className="py-3 px-3 sm:py-4 sm:px-4 text-left font-semibold text-gray-700 text-xs sm:text-sm uppercase tracking-wider">
                        Status
                      </th>
                      <th className="py-3 px-3 sm:py-4 sm:px-4 text-left font-semibold text-gray-700 text-xs sm:text-sm uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {userBookings.map((booking) => {
                      const statusColors = getStatusColors(
                        booking.bookingStatus
                      );

                      return (
                        <tr
                          key={booking._id}
                          className="hover:bg-gray-50 transition-colors duration-150"
                        >
                          {/* Guest Details */}
                          <td className="py-3 px-3 sm:py-4 sm:px-4">
                            <div className="flex items-start gap-2 sm:gap-3">
                              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <MdPerson className="text-gray-600 text-sm sm:text-lg" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="font-semibold text-gray-900 text-xs sm:text-sm truncate">
                                  {booking.fullName}
                                </p>
                                <p className="text-gray-600 text-xs truncate mt-1">
                                  {booking.email}
                                </p>
                                <div className="flex items-center gap-1 mt-1">
                                  <MdPhone className="text-gray-400 text-xs" />
                                  <span className="text-gray-600 text-xs">
                                    {booking.phoneNumber}
                                  </span>
                                </div>
                                {booking.tourId?.location && (
                                  <div className="flex items-center gap-1 mt-1">
                                    <MdLocationOn className="text-gray-400 text-xs" />
                                    <span className="text-gray-500 text-xs truncate">
                                      {booking.tourId?.location}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* Stay Dates */}
                          <td className="py-3 px-3 sm:py-4 sm:px-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                <span className="text-gray-700 text-xs sm:text-sm font-medium">
                                  {formatDate(booking.startDate)}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                                <span className="text-gray-700 text-xs sm:text-sm font-medium">
                                  {formatDate(booking.endDate)}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Duration */}
                          <td className="py-3 px-3 sm:py-4 sm:px-4">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded flex items-center justify-center">
                                <span className="text-blue-700 font-bold text-xs">
                                  {booking.tourId?.duration}
                                </span>
                              </div>
                              <span className="text-gray-700 text-xs sm:text-sm">
                                {booking.tourId?.duration}
                                {booking.tourId?.duration === 1
                                  ? " Day"
                                  : " Days"}
                              </span>
                            </div>
                          </td>

                          {/* Expenditure */}
                          <td className="py-3 px-3 sm:py-4 sm:px-4">
                            <div className="flex items-center gap-1 text-gray-700">
                              <FaDollarSign
                                className="text-gray-400"
                                size={14}
                              />
                              <span className="font-medium text-xs sm:text-sm">
                                {booking.bookingTotal}
                              </span>
                            </div>
                          </td>

                          {/* Status */}
                          <td className="py-3 px-3 sm:py-4 sm:px-4">
                            <div
                              className={`inline-flex items-center gap-2 px-2 py-1 sm:px-3 sm:py-1 rounded-full border ${statusColors.border} ${statusColors.bg} ${statusColors.text} font-medium text-xs`}
                            >
                              <div
                                className={`w-1.5 h-1.5 ${statusColors.dot} rounded-full`}
                              ></div>
                              {booking.bookingStatus?.charAt(0).toUpperCase() +
                                booking.bookingStatus?.slice(1) || "Pending"}
                            </div>
                          </td>

                          {/* Actions */}
                          <td className="py-3 px-3 sm:py-4 sm:px-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => viewBookingDetails(booking)}
                                className="flex items-center gap-1 sm:gap-2 px-2 py-1 sm:px-3 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-xs sm:text-sm"
                              >
                                <MdVisibility size={12} />
                                <span>View</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Empty State */}
              {userBookings.length === 0 && (
                <div className="text-center py-12 sm:py-16">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-gray-100 rounded-2xl flex items-center justify-center">
                    <MdHotel className="text-gray-400 text-2xl sm:text-3xl" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                    No Bookings Yet
                  </h3>
                  <p className="text-gray-600 max-w-md mx-auto mb-4 sm:mb-6 text-xs sm:text-sm">
                    You haven't made any bookings yet. Start planning your next
                    adventure!
                  </p>
                  <button className="px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-xs sm:text-sm">
                    Explore Properties
                  </button>
                </div>
              )}
            </>
          )}
        </div>
        {/* Professional Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalUserBookings}
            itemsPerPage={usersPerPage}
            currentItems={userBookings}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </div>
    </div>
  );
};

export default UserBooking;

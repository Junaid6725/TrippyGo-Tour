import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { MdInfo, MdFilterList, MdSearch, MdClose } from "react-icons/md";

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const token = useSelector((state) => state.auth.token);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/get-bookings`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBookings(response.data.booking || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const openDetailModal = (booking) => {
    setSelectedBooking(booking);
    setShowDetailModal(true);
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
    setSelectedBooking(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Filter bookings based on search term
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.phoneNumber.includes(searchTerm);

    return matchesSearch;
  });

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">All Bookings</h1>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MdSearch className="text-gray-400" size={20} />
              </div>
              <input
                type="text"
                placeholder="Search by name or phone..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <button
              className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors sm:hidden"
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? <MdClose size={18} /> : <MdFilterList size={18} />}
              {showFilters ? "Close" : "Filters"}
            </button>

            <div
              className={`${
                showFilters ? "flex" : "hidden"
              } sm:flex flex-col sm:flex-row gap-3 w-full sm:w-auto`}
            >
              <div className="relative">
                <select
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 w-full appearance-none bg-white text-sm"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="All">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {filteredBookings.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-lg shadow-sm">
            <div className="text-gray-500 text-lg mb-2">
              {bookings.length === 0
                ? "No bookings found"
                : "No matching bookings found"}
            </div>
            <p className="text-gray-400">
              {bookings.length === 0
                ? "When bookings are made, they will appear here."
                : "Try adjusting your search criteria."}
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
            {/* Responsive Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-3 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">
                      #
                    </th>
                    <th className="px-3 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">
                      Guest
                    </th>
                    <th className="px-3 py-3 text-left font-semibold text-gray-700 whitespace-nowrap hidden xs:table-cell">
                      Phone
                    </th>
                    <th className="px-3 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">
                      Guests
                    </th>
                    <th className="px-3 py-3 text-left font-semibold text-gray-700 whitespace-nowrap hidden sm:table-cell">
                      Date
                    </th>
                    <th className="px-3 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">
                      Total
                    </th>
                    <th className="px-3 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredBookings.map((item, index) => (
                    <tr
                      key={item._id}
                      className="hover:bg-gray-50 transition-colors group"
                    >
                      <td className="px-3 py-3 font-medium text-gray-900 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-8 w-8 flex-shrink-0 bg-violet-100 rounded-full flex items-center justify-center text-violet-600 font-bold mr-2">
                            {item.fullName.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">
                              {item.fullName}
                            </div>
                            <div className="text-xs text-gray-500 xs:hidden">
                              {item.phoneNumber}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-gray-700 whitespace-nowrap hidden xs:table-cell">
                        {item.phoneNumber}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                          {item.totalMembers}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-gray-700 whitespace-nowrap hidden sm:table-cell">
                        <div>{formatDate(item.createdAt)}</div>
                        <div className="text-xs text-gray-500">
                          {formatTime(item.createdAt)}
                        </div>
                      </td>
                      <td className="px-3 py-3 font-medium text-gray-900 whitespace-nowrap">
                        ${item.bookingTotal}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        <button
                          onClick={() => openDetailModal(item)}
                          className="p-1.5 text-violet-600 hover:bg-violet-100 rounded-full transition-colors"
                          title="View details"
                        >
                          <MdInfo size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Mobile view tip */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-700 sm:hidden border border-blue-100">
        <p className="flex items-center justify-center">
          <span className="mr-2">💡</span>
          Swipe horizontally to view all table columns
        </p>
      </div>

      {/* Booking Detail Modal */}
      {showDetailModal && selectedBooking && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Booking Details
              </h2>
              <button
                onClick={closeDetailModal}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <div className="h-12 w-12 flex-shrink-0 bg-violet-100 rounded-full flex items-center justify-center text-violet-600 font-bold mr-3">
                  {selectedBooking.fullName.charAt(0)}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">
                    {selectedBooking.fullName}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {selectedBooking.phoneNumber}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Guest Size</p>
                  <p className="font-medium">
                    {selectedBooking.totalMembers} people
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Total Amount</p>
                  <p className="font-medium">${selectedBooking.bookingTotal}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Booking Date</p>
                  <p className="font-medium">
                    {formatDate(selectedBooking.createdAt)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Booking Time</p>
                  <p className="font-medium">
                    {formatTime(selectedBooking.createdAt)}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">Booking ID</p>
                <p className="font-mono text-sm text-gray-700 break-all">
                  {selectedBooking._id}
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={closeDetailModal}
                className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllBookings;

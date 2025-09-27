import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const UserBooking = () => {
  const [userBookings, setUserBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
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
      setCurrentPage(response.data.currentPage || page);
    } catch (error) {
      console.log("Error fetching bookings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserBookings(currentPage);
  }, [currentPage]);

  const currentBookings = userBookings;

  return (
    <div className="p-4 md:p-6 min-h-screen">
      <h1 className="text-2xl text-center font-bold mb-6 text-gray-800">
        All Bookings
      </h1>

      {/* Table container */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          </div>
        ) : (
          <>
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-purple-100 text-purple-800">
                    <th className="py-4 px-4 text-left font-semibold text-sm uppercase">
                      Full Name
                    </th>
                    <th className="py-4 px-4 text-left font-semibold text-sm uppercase hidden sm:table-cell">
                      Email
                    </th>
                    <th className="py-4 px-4 text-left font-semibold text-sm uppercase hidden md:table-cell">
                      Phone
                    </th>
                    <th className="py-4 px-4 text-left font-semibold text-sm uppercase">
                      Booking Date
                    </th>
                    <th className="py-4 px-4 text-left font-semibold text-sm uppercase">
                      Status
                    </th>
                    <th className="py-4 px-4 text-left font-semibold text-sm uppercase">
                      Members
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentBookings.map((item) => (
                    <tr
                      key={item._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div>
                          <div className="font-medium text-gray-900">
                            {item.fullName}
                          </div>
                          <div className="text-sm text-gray-500 mt-1 sm:hidden">
                            {item.email}
                          </div>
                          <div className="text-sm text-gray-500 md:hidden">
                            {item.phoneNumber}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-700 hidden sm:table-cell">
                        {item.email}
                      </td>
                      <td className="py-4 px-4 text-gray-700 hidden md:table-cell">
                        {item.phoneNumber}
                      </td>
                      <td className="py-4 px-4 text-gray-700">
                        {new Date(item.bookingDate).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            item.bookingStatus === "confirmed"
                              ? "bg-green-100 text-green-800"
                              : item.bookingStatus === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {item.bookingStatus?.charAt(0).toUpperCase() +
                            item.bookingStatus?.slice(1) || "Pending"}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-700">
                        <div className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1 text-gray-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          {item.totalMembers}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty state */}
            {currentBookings.length === 0 && (
              <div className="text-center py-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 mx-auto text-gray-400 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                <p className="text-gray-500 text-lg">No bookings found</p>
                <p className="text-gray-400 mt-2">
                  Your bookings will appear here once made
                </p>
              </div>
            )}

            {/* Pagination Component - Only show if there are multiple pages */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between p-4 border-t border-gray-200">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
                >
                  <MdKeyboardArrowLeft size={18} />
                  Previous
                </button>

                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                  </span>

                  {/* Page numbers */}
                  <div className="hidden sm:flex gap-1">
                    {[...Array(totalPages)].map((_, index) => (
                      <button
                        key={index + 1}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`w-8 h-8 rounded-lg text-sm transition-colors ${
                          currentPage === index + 1
                            ? "bg-purple-600 text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
                >
                  Next
                  <MdKeyboardArrowRight size={18} />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Mobile pagination info - Only show if multiple pages exist */}
      {totalPages > 1 && (
        <div className="mt-4 p-3 bg-purple-50 rounded-lg text-sm text-purple-700 text-center lg:hidden">
          <p>
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex justify-center gap-1 mt-2">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`w-6 h-6 rounded text-xs ${
                  currentPage === index + 1
                    ? "bg-purple-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserBooking;

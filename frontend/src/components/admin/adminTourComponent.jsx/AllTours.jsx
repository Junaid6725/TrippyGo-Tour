import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import {
  FaEdit,
  FaTrash,
  FaMapMarkerAlt,
  FaUsers,
  FaDollarSign,
  FaHotel,
  FaPlusCircle,
  FaEllipsisV,
  FaStar,
  FaSearch,
  FaFilter,
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import useDebounce from "../../../hooks/useDebounce";
import SubtleSpinner from "./../../user/shared/SubtleSpinner";
import Pagination from "../../user/shared/Pagination";
import { deleteTour, getAllTours } from "../../../services/tourService";

const AllTours = () => {
  const token = useSelector((state) => state.auth.token);

  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeMenu, setActiveMenu] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [totalTours, setTotalTours] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  // Fetch tours from backend with pagination
  const fetchTour = async () => {
    try {
      setLoading(true);
      const res = await getAllTours(page, limit);

      setTours(res?.tours || []);
      setTotalPages(res?.totalPages || 1);
      setTotalTours(res?.total || 0);
    } catch (error) {
      console.log(error);
      setTours([]);
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTour();
  }, [page, debouncedSearch]);

  // Delete Tour
  const handleDelete = async (id, title) => {
    Swal.fire({
      title: "Are you sure?",
      html: `This will delete the tour <strong>"${title}"</strong> permanently!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#3b82f6",
      confirmButtonText: "Yes, delete it!",
      background: "#1f2937",
      color: "#f9fafb",
      customClass: {
        popup: "rounded-2xl border border-blue-200/20",
        confirmButton: "px-6 py-3 rounded-lg font-medium",
        cancelButton: "px-6 py-3 rounded-lg font-medium",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteTour(id, token);
          toast.success("Tour deleted successfully!");
          fetchTour();
        } catch (error) {
          console.log(error);
          toast.error("Failed to delete the tour");
        }
      }
    });
  };

  // Toggle menu
  const toggleMenu = (tourId, e) => {
    e.stopPropagation();
    setActiveMenu(activeMenu === tourId ? null : tourId);
  };

  const closeMenu = () => setActiveMenu(null);

  useEffect(() => {
    document.addEventListener("click", closeMenu);
    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, []);

  if (loading && tours.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold text-gray-600 dark:text-gray-300">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mr-3"></div>
        Loading Tours...
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text">
              Tour Management
            </h1>
            <p className="text-blue-600 dark:text-blue-400 font-medium">
              Manage all your tours in one place
            </p>
          </div>
          <Link
            to="/admin-dashboard/add-tour"
            className="flex items-center gap-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 font-semibold group"
          >
            <FaPlusCircle className="text-lg group-hover:scale-110 transition-transform" />
            Add New Tour
          </Link>
        </div>

        {/* Search Section */}
        <div className="mb-6">
          <div className="relative flex-1 w-full">
            {/* Search Icon */}
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaSearch className="text-blue-400 text-lg" />
            </div>

            {/* Input Field */}
            <input
              type="text"
              placeholder="Search tours by title or location..."
              className="pl-12 pr-10 py-3 w-full border border-blue-200 dark:border-blue-700 rounded-xl bg-white/50 dark:bg-gray-700/50 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 transition-all duration-200 focus:outline-none"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />

            {/* Subtle Spinner */}
            {loading && <SubtleSpinner />}
          </div>
        </div>

        {/* Tours Table - Responsive for all screens */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-blue-100/50 dark:border-blue-900/50">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] lg:min-w-full">
              <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                <tr>
                  <th className="p-4 text-left font-semibold whitespace-nowrap">
                    Tour Information
                  </th>
                  <th className="p-4 text-left font-semibold whitespace-nowrap">
                    Description
                  </th>
                  <th className="p-4 text-left font-semibold whitespace-nowrap">
                    Price & Group
                  </th>
                  <th className="p-4 text-left font-semibold whitespace-nowrap">
                    Hotel Details
                  </th>
                  <th className="p-4 text-left font-semibold whitespace-nowrap">
                    Location & Duration
                  </th>
                  <th className="p-4 text-right font-semibold whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-100/50 dark:divide-blue-900/50">
                {tours.length > 0 ? (
                  tours.map((data) => (
                    <tr
                      key={data._id}
                      className="hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors duration-200 group"
                    >
                      {/* Tour Information */}
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={data.tourImg || "/api/placeholder/80/60"}
                            alt={data.title}
                            className="w-12 h-12 sm:w-16 sm:h-12 object-cover rounded-lg shadow-md border-2 border-blue-200 group-hover:border-blue-300 transition-colors"
                          />
                          <div className="min-w-0 flex-1">
                            <h3 className="font-semibold text-gray-800 dark:text-white text-sm sm:text-base truncate">
                              {data.title}
                            </h3>
                            <div className="flex items-center mt-1">
                              <FaStar className="text-yellow-400 mr-1 text-xs sm:text-sm" />
                              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                                4.8 • 24 reviews
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Description */}
                      <td className="p-4">
                        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base line-clamp-2 max-w-xs">
                          {data.description}
                        </p>
                      </td>

                      {/* Price & Group */}
                      <td className="p-4">
                        <div className="space-y-2">
                          <div className="flex items-center text-green-600 dark:text-green-400 font-bold text-sm sm:text-base">
                            <FaDollarSign className="mr-1" />
                            {data.expenditure}
                          </div>
                          <div className="flex items-center text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                            <FaUsers className="mr-2 text-blue-500" />
                            <span>Group: {data.groupSize}</span>
                          </div>
                        </div>
                      </td>

                      {/* Hotel Details */}
                      <td className="p-4">
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                          <FaHotel className="mr-3 text-blue-500 flex-shrink-0" />
                          <div className="min-w-0">
                            <div className="font-medium text-sm sm:text-base line-clamp-1">
                              {data.hotelDetail}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                              Luxury Stay
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Location & Duration */}
                      <td className="p-4">
                        <div className="space-y-2">
                          <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                            <FaMapMarkerAlt className="text-red-400 mr-2 flex-shrink-0" />
                            <span className="truncate">{data.location}</span>
                          </div>
                          <div className="flex items-center text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
                            <FaCalendarAlt className="text-blue-400 mr-2 flex-shrink-0" />
                            <span>{data.duration}</span>
                          </div>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-right relative">
                        <button
                          onClick={(e) => toggleMenu(data._id, e)}
                          className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-colors ml-auto group"
                        >
                          <FaEllipsisV className="text-blue-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 text-sm sm:text-base" />
                        </button>

                        {activeMenu === data._id && (
                          <div className="absolute right-0 mt-2 w-40 sm:w-48 bg-white dark:bg-gray-800 rounded-xl shadow-2xl z-10 border border-blue-100 dark:border-blue-900 backdrop-blur-sm">
                            <div className="py-2">
                              <Link
                                to={`/admin-dashboard/edit-tour/${data._id}`}
                                className="flex items-center px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
                                onClick={() => setActiveMenu(null)}
                              >
                                <FaEdit className="mr-2 sm:mr-3 text-blue-500" />
                                Edit Tour
                              </Link>
                              <button
                                onClick={() =>
                                  handleDelete(data._id, data.title)
                                }
                                className="flex w-full items-center px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 dark:text-gray-200 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                              >
                                <FaTrash className="mr-2 sm:mr-3 text-red-500" />
                                Delete Tour
                              </button>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-12">
                      {searchTerm ? (
                        // When user searched and found nothing
                        <div className="flex flex-col items-center text-gray-500 dark:text-gray-400">
                          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl mb-4">
                            <svg
                              className="w-16 h-16 mx-auto text-blue-300"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </div>
                          <p className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">
                            No matching results found
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            We couldn’t find any tours for “
                            <span className="font-semibold text-blue-500">
                              {searchTerm}
                            </span>
                            ”. Try different keywords or filters.
                          </p>
                        </div>
                      ) : (
                        // Default empty state (no tours at all)
                        <div className="flex flex-col items-center text-gray-400 dark:text-gray-500">
                          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl mb-4">
                            <svg
                              className="w-16 h-16 mx-auto text-blue-300"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M15 11a3 3 0 11-6 0 3 3 0z"
                              />
                            </svg>
                          </div>
                          <p className="text-lg font-medium mb-2 text-gray-600 dark:text-gray-400">
                            No Tours Found
                          </p>
                          <p className="text-sm max-w-sm text-center">
                            Get started by creating your first tour!
                          </p>
                          <Link
                            to="/admin-dashboard/add-tour"
                            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                          >
                            Create Tour
                          </Link>
                        </div>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            totalItems={totalTours}
            itemsPerPage={toursPerPage}
            currentItems={tours}
            onPageChange={(page) => setPage(page)}
          />
        )}
      </div>
    </div>
  );
};

export default AllTours;

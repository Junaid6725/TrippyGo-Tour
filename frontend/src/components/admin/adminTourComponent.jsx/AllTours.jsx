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
} from "react-icons/fa";

const AllTours = () => {
  const token = useSelector((state) => state.auth.token);
  const [tour, setTour] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeMenu, setActiveMenu] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTours, setFilteredTours] = useState([]);

  const fetchTour = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/get-tours`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTour(response.data.tours || []);
      setFilteredTours(response.data.tours || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTour();
  }, []);

  useEffect(() => {
    const results = tour.filter(
      (tourItem) =>
        tourItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tourItem.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTours(results);
  }, [searchTerm, tour]);

  const handleDelete = async (id, title) => {
    Swal.fire({
      title: "Are you sure?",
      html: `This will delete the tour <strong>"${title}"</strong> permanently!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      customClass: {
        popup: "rounded-xl",
        confirmButton: "px-4 py-2 rounded-lg",
        cancelButton: "px-4 py-2 rounded-lg",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:8000/api/delete-tour/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          toast.success("Tour Successfully Deleted!");
          const updatedTours = tour.filter((t) => t._id !== id);
          setTour(updatedTours);
          setFilteredTours(updatedTours);
        } catch (error) {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Failed to delete the tour.",
          });
        }
      }
    });
  };

  const toggleMenu = (tourId, e) => {
    e.stopPropagation();
    setActiveMenu(activeMenu === tourId ? null : tourId);
  };

  const closeMenu = () => {
    setActiveMenu(null);
  };

  useEffect(() => {
    document.addEventListener("click", closeMenu);
    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold text-gray-600 dark:text-gray-300">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mr-3"></div>
        Loading Tours...
      </div>
    );
  }

  return (
    <div className=" min-h-screen p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200">
              Tour Management
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
              Manage all your tours in one place
            </p>
          </div>
          <Link
            to="/admin-dashboard/add-tour"
            className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 sm:px-4 sm:py-3 rounded-lg shadow-md transition-all transform hover:-translate-y-0.5 text-sm sm:text-base"
          >
            <FaPlusCircle className="text-sm sm:text-base" />
            <span className="hidden xs:inline">Add New Tour</span>
            <span className="xs:hidden">Add Tour</span>
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3 mb-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search tours by title or location..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg flex items-center gap-2 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <FaFilter className="text-sm" />
            <span className="hidden sm:inline">Filters</span>
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm md:text-base">
              <thead className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                <tr>
                  <th className="p-2 sm:p-3 text-left min-w-[140px]">Tour</th>
                  <th className="p-2 sm:p-3 text-left min-w-[160px] hidden md:table-cell">
                    Description
                  </th>
                  <th className="p-2 sm:p-3 text-left min-w-[80px]">Price</th>
                  <th className="p-2 sm:p-3 text-left min-w-[80px] hidden lg:table-cell">
                    Group
                  </th>
                  <th className="p-2 sm:p-3 text-left min-w-[120px] hidden xl:table-cell">
                    Hotel
                  </th>
                  <th className="p-2 sm:p-3 text-left min-w-[120px] hidden sm:table-cell">
                    Location
                  </th>
                  <th className="p-2 sm:p-3 text-left min-w-[100px] hidden xl:table-cell">
                    Duration
                  </th>
                  <th className="p-2 sm:p-3 text-right min-w-[80px]">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredTours.length > 0 ? (
                  filteredTours.map((data) => (
                    <tr
                      key={data._id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <td className="p-2 sm:p-3">
                        <div className="flex items-center">
                          <img
                            src={data.imgUrl}
                            alt={data.imgAlt}
                            className="w-12 h-10 sm:w-16 sm:h-12 object-cover rounded-lg shadow-sm"
                          />
                          <div className="ml-2 sm:ml-3">
                            <div className="font-medium text-gray-800 dark:text-gray-200 line-clamp-1 text-xs sm:text-sm">
                              {data.title}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center mt-0.5">
                              <FaStar className="text-yellow-400 mr-1 text-xs" />
                              4.8
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-2 sm:p-3 text-gray-600 dark:text-gray-300 hidden md:table-cell">
                        <div className="line-clamp-2 max-w-xs text-xs sm:text-sm">
                          {data.description}
                        </div>
                      </td>
                      <td className="p-2 sm:p-3">
                        <div className="flex items-center text-green-600 dark:text-green-400 font-semibold text-xs sm:text-sm">
                          <FaDollarSign className="mr-1 text-xs" />
                          {data.expenditure}
                        </div>
                      </td>
                      <td className="p-2 sm:p-3 hidden lg:table-cell">
                        <div className="flex items-center text-xs sm:text-sm">
                          <FaUsers className="text-gray-500 dark:text-gray-400 mr-1 sm:mr-2 text-xs" />
                          {data.groupSize}
                        </div>
                      </td>
                      <td className="p-2 sm:p-3 hidden xl:table-cell">
                        <div className="flex items-center text-xs sm:text-sm">
                          <FaHotel className="text-gray-500 dark:text-gray-400 mr-1 sm:mr-2 text-xs" />
                          <span className="line-clamp-1">
                            {data.hotelDetail}
                          </span>
                        </div>
                      </td>
                      <td className="p-2 sm:p-3 hidden sm:table-cell">
                        <div className="flex items-center text-xs sm:text-sm">
                          <FaMapMarkerAlt className="text-red-400 mr-1 sm:mr-2 text-xs" />
                          <span className="line-clamp-1">{data.location}</span>
                        </div>
                      </td>
                      <td className="p-2 sm:p-3 hidden xl:table-cell">
                        <div className="flex items-center text-xs sm:text-sm">
                          <FaCalendarAlt className="text-blue-400 mr-1 sm:mr-2 text-xs" />
                          {data.duration}
                        </div>
                      </td>
                      <td className="p-2 sm:p-3 text-right relative">
                        <button
                          onClick={(e) => toggleMenu(data._id, e)}
                          className="inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors ml-auto"
                        >
                          <FaEllipsisV className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm" />
                        </button>

                        {activeMenu === data._id && (
                          <div className="absolute right-0 mt-1 w-36 sm:w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-700">
                            <div className="py-1">
                              <Link
                                to={`/admin-dashboard/edit-tour/${data._id}`}
                                className="flex items-center px-3 py-2 text-xs sm:text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                onClick={() => setActiveMenu(null)}
                              >
                                <FaEdit className="mr-2 sm:mr-3 text-blue-500 text-xs sm:text-sm" />
                                Edit Tour
                              </Link>
                              <button
                                onClick={() =>
                                  handleDelete(data._id, data.title)
                                }
                                className="flex w-full items-center px-3 py-2 text-xs sm:text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                              >
                                <FaTrash className="mr-2 sm:mr-3 text-red-500 text-xs sm:text-sm" />
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
                    <td colSpan="8" className="text-center py-8 sm:py-12">
                      <div className="flex flex-col items-center text-blue-500 dark:text-gray-400">
                        <div className="bg-gray-100 dark:bg-gray-800 p-4 sm:p-5 rounded-full mb-3 sm:mb-4">
                          <svg
                            className="w-10 h-10 sm:w-12 sm:h-12 mx-auto"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </div>
                        <p className="text-base sm:text-lg font-medium mb-1 sm:mb-2">
                          No Tours Found
                        </p>
                        <p className="text-xs sm:text-sm max-w-xs text-center">
                          {searchTerm
                            ? "No tours match your search."
                            : "You haven't created any tours yet."}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mt-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          <div>
            Showing {filteredTours.length} of {tour.length} tours
          </div>
          {/* <div className="flex gap-2 mt-2 sm:mt-0">
            <button className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 :opacity-50">
              Previous
            </button>
            <button className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800">
              Next
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AllTours;

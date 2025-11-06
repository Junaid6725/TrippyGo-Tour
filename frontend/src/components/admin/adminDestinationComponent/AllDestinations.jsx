import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import {
  FaPlusCircle,
  FaSearch,
  FaEye,
  FaTrash,
  FaEllipsisV,
  FaMapMarkerAlt,
  FaCalendar,
  FaGlobe,
} from "react-icons/fa";
import useDebounce from "../../../hooks/useDebounce";
import Pagination from "../../user/shared/Pagination";
import SubtleSpinner from "../../user/shared/SubtleSpinner";
import {
  deleteDestination,
  getAdminDestinations,
} from "../../../services/destinationService";

const AllDestinations = () => {
  const token = useSelector((state) => state.auth.token);

  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [activeMenu, setActiveMenu] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const destinationsPerPage = 4;
  const [totalDestinations, setTotalDestinations] = useState(0);

  // ✅ Fetch destinations from backend
  const fetchDestinations = async () => {
    try {
      setLoading(true);
      const data = await getAdminDestinations(
        debouncedSearch,
        currentPage,
        destinationsPerPage
      );

      setDestinations(data.destinations || []);
      setTotalPages(data.totalPages || 1);
      setTotalDestinations(data.totalDestinations || 0);
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Failed to fetch destinations"
      );
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch whenever page or search term changes
  useEffect(() => {
    fetchDestinations();
  }, [debouncedSearch, currentPage]);

  // ✅ Delete Destination
  const handleDelete = async (id, name) => {
    Swal.fire({
      title: "Are you sure?",
      html: `This will delete <strong>"${name}"</strong> permanently!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#3b82f6",
      confirmButtonText: "Yes, delete it!",
      background: "#1f2937",
      color: "#f9fafb",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteDestination(id, token);
          toast.success("Destination deleted successfully!");
          fetchDestinations();
        } catch (error) {
          console.log(error);
          toast.error("Failed to delete destination");
        }
      }
    });
  };

  // ✅ View Destination Details
  const handleView = (destination) => {
    setSelectedDestination(destination);
    setIsModalOpen(true);
    setActiveMenu(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDestination(null);
  };

  // ✅ Toggle action menu
  const toggleMenu = (id, e) => {
    e.stopPropagation();
    setActiveMenu(activeMenu === id ? null : id);
  };

  const closeMenu = () => setActiveMenu(null);
  useEffect(() => {
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, []);

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text">
              Destinations Management
            </h1>
            <p className="text-blue-600 dark:text-blue-400 font-medium">
              Manage your destinations here
            </p>
          </div>
          <Link
            to="/admin-dashboard/add-destination"
            className="flex items-center gap-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 font-semibold group"
          >
            <FaPlusCircle className="text-lg group-hover:scale-110 transition-transform" />
            Add New Destination
          </Link>
        </div>

        {/* Search Section */}
        <div className="mb-6">
          <div className="relative flex-1 w-full">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaSearch className="text-blue-400 text-lg" />
            </div>

            <input
              type="text"
              placeholder="Search destinations by name..."
              className="pl-12 pr-10 py-3 w-full border border-blue-200 dark:border-blue-700 rounded-xl bg-white/50 dark:bg-gray-700/50 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 transition-all duration-200 focus:outline-none"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />

            {loading && <SubtleSpinner />}
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-blue-100/50 dark:border-blue-900/50">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                <tr>
                  <th className="p-4 text-left font-semibold">Image</th>
                  <th className="p-4 text-left font-semibold">
                    Destination Name
                  </th>
                  <th className="p-4 text-left font-semibold">Created At</th>
                  <th className="p-4 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-100/50 dark:divide-blue-900/50">
                {destinations.length > 0 ? (
                  destinations.map((data) => (
                    <tr
                      key={data._id}
                      className="hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors duration-200 group"
                    >
                      <td className="p-4">
                        <img
                          src={data.destinationImg || "/api/placeholder/100/80"}
                          alt={data.name}
                          className="w-16 h-12 object-cover rounded-lg shadow-md border-2 border-blue-200 group-hover:border-blue-300 transition"
                        />
                      </td>
                      <td className="p-4 text-gray-800 dark:text-gray-200 font-medium">
                        {data.name}
                      </td>
                      <td className="p-4 text-gray-600 dark:text-gray-400 text-sm">
                        {new Date(data.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-right relative">
                        <button
                          onClick={(e) => toggleMenu(data._id, e)}
                          className="inline-flex items-center justify-center w-8 h-8 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/20 transition"
                        >
                          <FaEllipsisV className="text-blue-500" />
                        </button>

                        {activeMenu === data._id && (
                          <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-xl shadow-xl z-10 border border-blue-100 dark:border-blue-900 backdrop-blur-sm">
                            <div className="py-2">
                              <button
                                onClick={() => handleView(data)}
                                className="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                              >
                                <FaEye className="mr-3 text-blue-500" />
                                View Details
                              </button>
                              <button
                                onClick={() =>
                                  handleDelete(data._id, data.name)
                                }
                                className="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-red-50 dark:hover:bg-red-900/20"
                              >
                                <FaTrash className="mr-3 text-red-500" />
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-8 text-gray-500">
                      No destinations found
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
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalDestinations}
            itemsPerPage={destinationsPerPage}
            currentItems={destinations}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </div>

      {/* View Destination Modal */}
      {isModalOpen && selectedDestination && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-t-2xl">
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-bold text-white">
                  {selectedDestination.name}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-white/80 hover:text-white transition-colors text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              <div className="flex justify-center">
                <img
                  src={
                    selectedDestination.destinationImg ||
                    "/api/placeholder/400/250"
                  }
                  alt={selectedDestination.name}
                  className="w-full max-w-md h-64 object-cover rounded-xl shadow-lg border-2 border-blue-200 dark:border-blue-700"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <FaMapMarkerAlt className="text-blue-500 text-lg" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Name
                      </p>
                      <p className="font-semibold text-gray-800 dark:text-white">
                        {selectedDestination.name}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <FaGlobe className="text-blue-500 text-lg" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Country
                      </p>
                      <p className="font-semibold text-gray-800 dark:text-white">
                        {selectedDestination.country || "Not specified"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <FaCalendar className="text-blue-500 text-lg" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Created At
                      </p>
                      <p className="font-semibold text-gray-800 dark:text-white">
                        {new Date(
                          selectedDestination.createdAt
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <FaCalendar className="text-blue-500 text-lg" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Updated At
                      </p>
                      <p className="font-semibold text-gray-800 dark:text-white">
                        {new Date(
                          selectedDestination.updatedAt
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {selectedDestination.description && (
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                    Description
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {selectedDestination.description}
                  </p>
                </div>
              )}

              {selectedDestination.location && (
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                    Location Details
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {selectedDestination.location}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllDestinations;

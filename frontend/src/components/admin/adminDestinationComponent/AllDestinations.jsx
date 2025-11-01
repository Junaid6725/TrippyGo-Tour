import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import {
  FaPlusCircle,
  FaSearch,
  FaEdit,
  FaTrash,
  FaEllipsisV,
  FaMapMarkerAlt,
} from "react-icons/fa";
import useDebounce from "../../../hooks/useDebounce";
import Pagination from "../../user/shared/Pagination";
import SubtleSpinner from "../../user/shared/SubtleSpinner";

const AllDestinations = () => {
  const token = useSelector((state) => state.auth.token);

  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [activeMenu, setActiveMenu] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const destinationsPerPage = 5;
  const [totalDestinations, setTotalDestinations] = useState(0);

  // Fetch all destinations
  const fetchDestinations = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8000/api/get-destinations`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setDestinations(response.data.destinations || []);
      setTotalPages(response.data.totalPages || 1);
      setTotalDestinations(response.data.total || 0);
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Failed to fetch destinations"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  // Delete Destination
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
          await axios.delete(
            `http://localhost:8000/api/delete-destination/${id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          toast.success("Destination deleted successfully!");
          fetchDestinations();
        } catch (error) {
          console.log(error);
          toast.error("Failed to delete destination");
        }
      }
    });
  };

  // Toggle action menu
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
                              <Link
                                to={`/admin-dashboard/edit-destination/${data._id}`}
                                className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                              >
                                <FaEdit className="mr-3 text-blue-500" />
                                Edit
                              </Link>
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
    </div>
  );
};

export default AllDestinations;

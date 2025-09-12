import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import {
  FaEdit,
  FaTrash,
  FaMapMarkerAlt,
  FaUsers,
  FaDollarSign,
  FaHotel,
} from "react-icons/fa";

const AllTours = () => {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const [tour, setTour] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const fetchTour = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/get-tours`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTour(response.data.tours || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTour();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold text-gray-600">
        Loading Tours...
      </div>
    );
  }

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This tour will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:8000/api/delete-tour/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          toast.success("Tour Successfully Deleted!");
          setTour((prevTours) => prevTours.filter((t) => t._id !== id));
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

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen p-4 sm:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {tour.length > 0 ? (
          tour.map((data, index) => (
            <div
              key={index}
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col h-auto max-w-sm mx-auto"
            >
              <div className="relative">
                <img
                  className="w-full h-40 sm:h-44 md:h-48 object-cover"
                  src={data.imgUrl}
                  alt={data.imgAlt}
                />
                <div className="absolute top-3 left-3 bg-purple-600 text-white text-[10px] sm:text-xs font-semibold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-md">
                  {data.duration}
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 sm:p-3">
                  <h2 className="text-sm sm:text-base md:text-lg font-bold text-white truncate">
                    {data.title}
                  </h2>
                </div>
              </div>

              {/* --- Card Content --- */}
              <div className="p-3 sm:p-5 flex flex-col">
                <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 line-clamp-2 mb-3 sm:mb-4">
                  {data.description}
                </p>

                <div className="space-y-1.5 sm:space-y-2 text-gray-700 dark:text-gray-300 text-xs sm:text-sm md:text-base">
                  <p className="flex items-center gap-1 sm:gap-2">
                    <FaDollarSign className="text-green-600" />
                    <strong>Price:</strong> {data.expenditure}
                  </p>
                  <p className="flex items-center gap-1 sm:gap-2">
                    <FaUsers className="text-blue-600" />
                    <strong>Group:</strong> {data.groupSize}
                  </p>
                  <p className="flex items-center gap-1 sm:gap-2">
                    <FaHotel className="text-yellow-600" />
                    <strong>Hotel:</strong> {data.hotelDetail}
                  </p>
                  <p className="flex items-center gap-1 sm:gap-2">
                    <FaMapMarkerAlt className="text-red-500" />
                    <strong>Location:</strong> {data.location}
                  </p>
                </div>

                {/* --- Buttons --- */}
                <div className="flex flex-row justify-between gap-2 mt-4">
                  <Link
                    to={`/admin-dashboard/edit-tour/${data._id}`}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition transform hover:scale-105 shadow-md"
                  >
                    <FaEdit />
                  </Link>
                  <button
                    onClick={() => handleDelete(data._id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition transform hover:scale-105 shadow-md hover:cursor-pointer"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex justify-center items-center py-10">
            <p className="text-lg font-semibold text-gray-600 dark:text-gray-300">
              🚫 No More Tour Found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllTours;

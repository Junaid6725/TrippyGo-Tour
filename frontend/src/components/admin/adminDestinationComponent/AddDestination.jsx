import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import {
  FaMapMarkerAlt,
  FaCamera,
  FaGlobeAmericas,
  FaPlus,
  FaMountain,
  FaUmbrellaBeach,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { createDestination } from "../../../services/destinationService";

const AddDestination = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const [imagePreview, setImagePreview] = useState(null);
  const token = useSelector((state) => state.auth.token);

  const onSubmit = async (data) => {
    try {
      // 👇 Create FormData for file upload
      const formData = new FormData();
      formData.append("name", data.name);
      if (data.destinationImg && data.destinationImg[0]) {
        formData.append("destinationImg", data.destinationImg[0]);
      }

      const response = await createDestination(formData);

      if (response.data.success) {
        Swal.fire({
          title: "Destination Added!",
          text: "The destination has been successfully created.",
          icon: "success",
          confirmButtonColor: "#2563eb",
        });
        reset();
        setImagePreview(null);
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Something went wrong.",
        icon: "error",
        confirmButtonColor: "#2563eb",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-4 px-3 xs:py-6 xs:px-4 sm:py-8 sm:px-6 lg:py-12 lg:px-8">
      <div className="max-w-sm mx-auto xs:max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
        {/* Card Container */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 xs:p-5 sm:p-6 text-center">
            <div className="flex items-center justify-center space-x-3 mb-2">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                <FaGlobeAmericas className="text-blue-600 dark:text-blue-400 text-xl sm:text-2xl" />
              </div>
              <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
                Add New Destination
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm xs:text-base">
              Share amazing places with the world
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-4 xs:p-5 sm:p-6 space-y-4 xs:space-y-5 sm:space-y-6"
          >
            {/* Destination Name */}
            <div className="space-y-2">
              <label className="flex items-center text-sm xs:text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">
                <FaMapMarkerAlt className="mr-2 text-blue-500 text-lg" />
                Destination Name
              </label>
              <input
                type="text"
                placeholder="e.g., Paris, France"
                {...register("name", {
                  required: "Destination name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
                className="w-full px-3 xs:px-4 py-2 xs:py-3 text-sm xs:text-base border border-gray-300 dark:border-gray-600 rounded-lg xs:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-200 placeholder-gray-500"
              />
              {errors.name && (
                <p className="text-red-500 text-xs xs:text-sm flex items-center mt-1">
                  <span className="ml-1">{errors.name.message}</span>
                </p>
              )}
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <label className="flex items-center text-sm xs:text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">
                <FaCamera className="mr-2 text-blue-500 text-lg" />
                Upload Destination Image
              </label>
              <input
                type="file"
                accept="image/*"
                {...register("destinationImg", {
                  required: "Image file is required",
                })}
                className="w-full text-sm xs:text-base border border-gray-300 dark:border-gray-600 rounded-lg xs:rounded-xl p-2 cursor-pointer file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition-all"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => setImagePreview(reader.result);
                    reader.readAsDataURL(file);
                  } else {
                    setImagePreview(null);
                  }
                }}
              />
              {errors.destinationImg && (
                <p className="text-red-500 text-xs xs:text-sm mt-1">
                  {errors.destinationImg.message}
                </p>
              )}
            </div>

            {/* Image Preview */}
            {imagePreview && (
              <div className="flex justify-center">
                <div className="relative w-full max-w-xs xs:max-w-sm sm:max-w-md">
                  <img
                    src={imagePreview}
                    alt="Destination preview"
                    className="w-full h-40 xs:h-48 sm:h-56 object-cover rounded-lg border-2 border-gray-300 dark:border-gray-600 shadow-sm"
                  />
                </div>
              </div>
            )}

            {/* Popular Destination Types */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 xs:p-4">
              <label className="block text-sm xs:text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Popular Destination Types
              </label>
              <div className="flex justify-center space-x-4 xs:space-x-6">
                <div className="flex flex-col items-center text-gray-600 dark:text-gray-400">
                  <FaMountain className="text-2xl xs:text-3xl mb-1" />
                  <span className="text-xs">Mountain</span>
                </div>
                <div className="flex flex-col items-center text-gray-600 dark:text-gray-400">
                  <FaUmbrellaBeach className="text-2xl xs:text-3xl mb-1" />
                  <span className="text-xs">Beach</span>
                </div>
                <div className="flex flex-col items-center text-gray-600 dark:text-gray-400">
                  <FaGlobeAmericas className="text-2xl xs:text-3xl mb-1" />
                  <span className="text-xs">City</span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 xs:py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg xs:rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed shadow-md flex items-center justify-center space-x-2 text-sm xs:text-base"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 xs:w-5 xs:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Adding Destination...</span>
                </>
              ) : (
                <>
                  <FaPlus className="text-base xs:text-lg" />
                  <span>Add Destination</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDestination;

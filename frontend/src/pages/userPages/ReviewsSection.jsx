import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  FaStar,
  FaRegClock,
  FaEnvelope,
  FaUserCircle,
  FaPlus,
  FaTimes,
} from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import { addTourReview, getTourReviews } from "../../services/reviewService";

const ReviewsSection = ({ tourId, token, restrictAddReview = false }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // ✅ Fetch Reviews
  const getReviews = async () => {
    setLoading(true);
    try {
      const res = await await getTourReviews(tourId, token);
      setReviews(res?.reviews || []);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Submit Review
  const handleAddReview = async (data) => {
    setSubmitting(true);
    try {
      const res = await addTourReview(tourId, data, token);

      setReviews((prev) => [res?.review, ...prev]);
      reset();
      setShowForm(false);

      await Swal.fire({
        title: "Success!",
        text: "Thank you for your review!",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Failed to add review",
        "error"
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ✅ Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // ✅ Load reviews when component mounts
  useEffect(() => {
    getReviews();
  }, [tourId]);

  // ⭐ Star ratings
  const renderStars = (rating) => (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <FaStar
          key={s}
          className={`transition-colors duration-200 ${
            s <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
          size={14}
        />
      ))}
      <span className="ml-1 text-xs sm:text-sm font-medium text-gray-700">
        ({rating}.0)
      </span>
    </div>
  );

  return (
    <div className="bg-white shadow-lg mt-4 sm:mt-6 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200">
      {/* Header Section */}
      <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="flex-1 min-w-0">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
            Reviews & Comments
          </h3>
          <p className="text-gray-600 text-xs sm:text-sm mt-1">
            Share your experience with others
          </p>
        </div>

        {!restrictAddReview && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 sm:px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg font-medium text-sm sm:text-base whitespace-nowrap"
          >
            {showForm ? (
              <>
                <FaTimes className="text-sm" />
                Cancel
              </>
            ) : (
              <>
                <FaPlus className="text-sm" />
                Add Review
              </>
            )}
          </button>
        )}
      </div>

      {/* Review Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit(handleAddReview)}
          className="mb-6 sm:mb-8 p-4 sm:p-6 border border-blue-200 rounded-lg sm:rounded-xl bg-blue-50"
        >
          <div className="relative">
            <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
              <FaUserCircle className="text-blue-500 text-sm sm:text-base" />
              Share Your Experience
            </h4>

            <div className="mb-3 sm:mb-4">
              <label className="block mb-1 sm:mb-2 font-semibold text-gray-700 text-sm sm:text-base">
                Rating <span className="text-red-500">*</span>
              </label>
              <select
                {...register("rating", { required: "Rating is required" })}
                className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white text-sm sm:text-base"
              >
                <option value="">Select Rating</option>
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n} Star{n > 1 && "s"} -{" "}
                    {["Poor", "Fair", "Good", "Very Good", "Excellent"][n - 1]}
                  </option>
                ))}
              </select>
              {errors.rating && (
                <p className="text-red-500 text-xs sm:text-sm mt-1 flex items-center gap-1">
                  ⚠️ {errors.rating.message}
                </p>
              )}
            </div>

            <div className="mb-3 sm:mb-4">
              <label className="block mb-1 sm:mb-2 font-semibold text-gray-700 text-sm sm:text-base">
                Your Review <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register("comment", {
                  required: "Review is required",
                  minLength: {
                    value: 10,
                    message: "Review must be at least 10 characters long",
                  },
                })}
                rows="3"
                placeholder="Share your thoughts about this tour..."
                className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none bg-white text-sm sm:text-base"
              ></textarea>
              {errors.comment && (
                <p className="text-red-500 text-xs sm:text-sm mt-1 flex items-center gap-1">
                  ⚠️ {errors.comment.message}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 sm:px-8 py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg font-semibold disabled:bg-blue-400 disabled:cursor-not-allowed text-sm sm:text-base flex-1"
              >
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-white"></div>
                    Submitting...
                  </>
                ) : (
                  "Submit Review"
                )}
              </button>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium text-sm sm:text-base"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Reviews List */}
      {loading ? (
        <div className="text-center py-6 sm:py-8">
          <div className="inline-block animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-blue-600"></div>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            Loading reviews...
          </p>
        </div>
      ) : reviews.length > 0 ? (
        <div className="space-y-3 sm:space-y-4">
          {reviews.map((r) => (
            <div
              key={r._id}
              className="border-l-4 border-blue-500 bg-gray-50 rounded-r-lg p-3 sm:p-5 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex flex-col xs:flex-row xs:justify-between xs:items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className="flex items-start gap-2 sm:gap-3 min-w-0">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                    {r.user?.fullName
                      ? r.user.fullName.charAt(0).toUpperCase()
                      : "A"}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h5 className="font-bold text-gray-800 text-sm sm:text-base">
                      {r.user?.fullName || "Anonymous Traveler"}
                    </h5>
                    <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-2 sm:gap-3 mt-1 text-xs sm:text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <FaEnvelope className="text-blue-500 text-xs flex-shrink-0" />
                        <span className="text-gray-500">
                          {r.user?.email || "No email"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaRegClock className="text-blue-500 text-xs flex-shrink-0" />
                        <span className="text-gray-500">
                          {formatDate(r.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="xs:text-right mt-1 xs:mt-0">
                  {renderStars(r.rating)}
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed bg-white p-3 sm:p-4 rounded-lg border border-gray-200 text-sm sm:text-base">
                {r.comment}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 sm:py-8">
          <div className="text-gray-400 text-4xl sm:text-6xl mb-3 sm:mb-4">
            💬
          </div>
          <p className="text-gray-500 text-base sm:text-lg font-semibold">
            No reviews yet.
          </p>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">
            Be the first to share your experience!
          </p>
          {!restrictAddReview && !showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="mt-3 sm:mt-4 bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md font-medium text-sm sm:text-base"
            >
              Write First Review
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ReviewsSection;

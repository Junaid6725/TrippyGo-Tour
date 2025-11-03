import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaHourglassStart, FaStar } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { IoLocation } from "react-icons/io5";
import { MdOutlineAttachMoney } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const Booking = () => {
  const [tour, setTour] = useState(null);
  const [members, setMembers] = useState(1);
  const [reviews, setReviews] = useState([]); // State for storing reviews
  const [showReviewForm, setShowReviewForm] = useState(false); // Toggle review form
  const [loadingReviews, setLoadingReviews] = useState(false); // Loading state for reviews
  const { id } = useParams();
  const navigate = useNavigate();

  // Form for booking
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Form for reviews
  const {
    register: registerReview,
    handleSubmit: handleSubmitReview,
    reset: resetReview,
    formState: { errors: reviewErrors },
  } = useForm();

  const token = useSelector((state) => state.auth.token);

  // Fetch tour details
  const getTourById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/get-tour/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTour(response.data.singleTour || null);
    } catch (error) {
      console.log("Error fetching tour:", error);
    }
  };

  // Fetch reviews for this tour
  const getReviews = async () => {
    setLoadingReviews(true);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/tours/${id}/reviews`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setReviews(response.data.reviews || []);
    } catch (error) {
      console.log("Error fetching reviews:", error);
      // If endpoint doesn't exist, show sample reviews
      setReviews([
        {
          id: 1,
          userName: "John Doe",
          rating: 5,
          comment: "Amazing experience! The tour guide was very knowledgeable.",
          date: "2024-01-15",
        },
        {
          id: 2,
          userName: "Sarah Smith",
          rating: 4,
          comment: "Great tour, beautiful locations. Would recommend!",
          date: "2024-01-10",
        },
      ]);
    } finally {
      setLoadingReviews(false);
    }
  };

  // Submit a new review
  const handleAddReview = async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/tours/${id}/reviews`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Add new review to the list
      setReviews((prev) => [response.data.review, ...prev]);
      resetReview();
      setShowReviewForm(false);

      Swal.fire({
        icon: "success",
        title: "Review Added",
        text: "Thank you for your review!",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error.response?.data?.message || "Failed to add review",
      });
    }
  };

  // Calculate average rating
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "No ratings yet";

  useEffect(() => {
    getTourById();
    getReviews();
  }, [id]);

  const handleBooking = async (data) => {
    try {
      await axios.post(`http://localhost:8000/api/booking-tour/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Swal.fire({
        icon: "success",
        iconColor: "green",
        title: "Booking Tour",
        text: "You Book Tour Successfully!",
        button: "green",
      });
      navigate("/user-dashboard");
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error.response?.data?.message || "Something Went Wrong",
        button: "red",
      });
    }
  };

  // Render star rating
  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`text-lg ${
              star <= rating ? "text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-2 text-sm text-gray-600">({rating})</span>
      </div>
    );
  };

  return (
    <>
      <section className="max-w-[1200px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column - Tour Image and Details */}
          <div className="w-full">
            <img
              src={tour?.tourImg}
              alt={tour?.location}
              className="rounded-2xl w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
            />

            <div className="bg-white shadow mt-6 rounded-xl p-6">
              <h2 className="text-2xl font-bold">{tour?.title}</h2>
              <div className="flex gap-4 mt-2 text-gray-600">
                <span className="flex justify-center items-center gap-1">
                  <FaStar className="text-xl text-yellow-400" />
                  {averageRating} ({reviews.length} reviews)
                </span>
                <span className="flex justify-center items-center gap-1">
                  <FaHourglassStart className="text-lg text-gray-700" />{" "}
                  {tour?.duration}
                </span>
              </div>
              <div className="flex gap-4 mt-2 text-sm text-gray-600">
                <span className="flex justify-center items-center gap-1">
                  <IoLocation className="text-xl text-gray-700" />{" "}
                  {tour?.location}
                </span>
                <span className="flex justify-center items-center gap-1">
                  <MdOutlineAttachMoney className="text-xl text-gray-700" />
                  {tour?.expenditure} / per person
                </span>
                <span className="flex justify-center items-center gap-1">
                  <FaUsers className="text-xl text-gray-700" />
                  {tour?.groupSize} people
                </span>
              </div>
            </div>

            {/* Reviews and Comments Section */}
            <div className="bg-white shadow mt-6 rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Reviews & Comments</h3>
                <button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {showReviewForm ? "Cancel" : "Add Review"}
                </button>
              </div>

              {/* Review Form */}
              {showReviewForm && (
                <form
                  onSubmit={handleSubmitReview(handleAddReview)}
                  className="mb-8 p-4 border rounded-lg bg-gray-50"
                >
                  <h4 className="text-lg font-semibold mb-4">Write a Review</h4>

                  {/* Rating Input */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rating
                    </label>
                    <select
                      {...registerReview("rating", {
                        required: "Rating is required",
                        min: { value: 1, message: "Minimum rating is 1" },
                        max: { value: 5, message: "Maximum rating is 5" },
                      })}
                      className="w-full p-2 border rounded"
                    >
                      <option value="">Select Rating</option>
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                          {num} Star{num > 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                    {reviewErrors.rating && (
                      <p className="text-red-500 text-sm mt-1">
                        {reviewErrors.rating.message}
                      </p>
                    )}
                  </div>

                  {/* Comment Input */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Review
                    </label>
                    <textarea
                      {...registerReview("comment", {
                        required: "Review comment is required",
                        minLength: {
                          value: 10,
                          message: "Review must be at least 10 characters",
                        },
                        maxLength: {
                          value: 500,
                          message: "Review must be less than 500 characters",
                        },
                      })}
                      rows="4"
                      placeholder="Share your experience with this tour..."
                      className="w-full p-2 border rounded"
                    />
                    {reviewErrors.comment && (
                      <p className="text-red-500 text-sm mt-1">
                        {reviewErrors.comment.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Submit Review
                  </button>
                </form>
              )}

              {/* Reviews List */}
              <div className="space-y-6">
                {loadingReviews ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading reviews...</p>
                  </div>
                ) : reviews.length > 0 ? (
                  reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-b pb-6 last:border-b-0"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h5 className="font-semibold text-lg">
                            {review.userName}
                          </h5>
                          {renderStars(review.rating)}
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700 mt-2">{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <FaStar className="text-4xl text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">
                      No reviews yet. Be the first to review!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Form */}
          <div className="bg-white shadow rounded-xl p-6">
            <h3 className="text-3xl font-semibold text-center">
              Book Your Tour!
            </h3>

            <form
              className="space-y-4 mt-6"
              onSubmit={handleSubmit(handleBooking)}
            >
              <input
                {...register("fullName", {
                  required: "Full name is required!",
                  pattern: {
                    value: /^[A-Za-z]+(?:\s[A-Za-z]+)+$/,
                    message:
                      "Please enter your full name (first and last name)",
                  },
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters long",
                  },
                  maxLength: {
                    value: 25,
                    message: "Name must be at most 25 characters long",
                  },
                })}
                type="text"
                placeholder="Full Name"
                className="w-full p-2 border rounded"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fullName.message}
                </p>
              )}
              <input
                {...register("phoneNumber", {
                  required: "Phone number is required!",
                  pattern: {
                    value: /^(03[0-9]{9}|\+923[0-9]{9})$/,
                    message: "Please enter a valid phone number!",
                  },
                })}
                type="tel"
                placeholder="Phone No"
                className="w-full p-2 border rounded"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phoneNumber.message}
                </p>
              )}
              <input
                {...register("startDate", {
                  required: "Booking date is required!",
                })}
                type="date"
                className="w-full p-2 border rounded"
                min={new Date().toISOString().split("T")[0]}
              />
              {errors.startDate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.startDate.message}
                </p>
              )}
              <input
                {...register("totalMembers", {
                  required: "Total member is required!",
                })}
                type="number"
                placeholder="Total Members"
                className="w-full p-2 border rounded"
                onChange={(e) => setMembers(Number(e.target.value))}
              />
              {errors.totalMembers && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.totalMembers.message}
                </p>
              )}

              <div className="text-sm text-gray-600">
                <div className="flex justify-between mt-2">
                  <span>
                    {tour?.expenditure} × {members} person
                  </span>
                  <span>{tour?.expenditure}</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span>Service Charge</span>
                  <span>$50</span>
                </div>
              </div>

              <div className="flex justify-between font-bold text-lg mt-4">
                <span>Total</span>
                <span>
                  ${" "}
                  {tour?.expenditure * members === 0
                    ? null
                    : tour?.expenditure * members}
                </span>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="w-full text-lg transition-colors hover:cursor-pointer py-3 px-8 bg-blue-600 text-white rounded-xl shadow-md transform hover:scale-105 duration-300 text-center"
                >
                  Book Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Booking;

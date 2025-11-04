import Booking from "../models/bookingModel.js";
import Tour from "../models/tourModel.js";
import Review from "./../models/reviewModel.js";

export const addReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user?.id;

    const completedBooking = await Booking.findOne({
      userId: userId,
      tourId: id,
      bookingStatus: "completed",
    });

    if (!completedBooking) {
      return res.status(403).json({
        success: false,
        message: "You can only review a tour after completing it.",
      });
    }

    const existingReview = await Review.findOne({ user: userId, tour: id });
    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this tour.",
      });
    }

    if (!rating || !comment) {
      return res.status(400).json({
        success: false,
        message: "Rating and comment are required.",
      });
    }

    const review = new Review({ user: userId, tour: id, rating, comment });
    await review.save();
    const populatedReview = await Review.findById(review._id).populate(
      "user",
      "name email"
    );

    await Tour.findByIdAndUpdate(id, { $push: { reviews: review._id } });

    const tour = await Tour.findById(id).populate("reviews");

    const total = tour.reviews.reduce((sum, r) => sum + r.rating, 0);
    const avgRating = tour.reviews.length > 0 ? total / tour.reviews.length : 0;
    tour.averageRating = avgRating;

    await tour.save();

    return res.status(201).json({
      success: true,
      message: "Review added successfully!",
      review: populatedReview,
      averageRating: tour.averageRating,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to add review." });
  }
};

export const getTourReviews = async (req, res) => {
  try {
    const { id } = req.params;

    const tour = await Tour.findById(id);
    if (!tour) {
      return res
        .status(404)
        .json({ success: false, message: "Tour not found." });
    }

    const reviews = await Review.find({ tour: id })
      .populate("user", "fullName email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reviews.length,
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch reviews.",
      error: error.message,
    });
  }
};

import Booking from "../models/bookingModel.js";
import Tour from "../models/tourModel.js";
import Review from "./../models/reviewModel.js";

export const addReview = async (req, res) => {
  try {
    const { tourId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user?.id;

    const completedBooking = await Booking.findOne({
      user: userId,
      tour: tourId,
      bookingStatus: "completed",
    });

    if (!completedBooking) {
      return res.status(403).json({
        success: false,
        message: "You can only review a tour after completing it.",
      });
    }

    const existingReview = await Review.findOne({ user: userId, tour: tourId });
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

    const populatedReview = await Review.findById(review._id).populate(
      "user",
      "name email"
    );

    const review = new Review({ user: userId, tour: tourId, rating, comment });
    await review.save();

    await Tour.findByIdAndUpdate(tourId, { $push: { reviews: review._id } });

    const tour = await Tour.findById(tourId).populate("reviews");

    const total = tour.reviews.reduce((sum, r) => sum + r.rating, 0);
    const avgRating = tour.reviews.length > 0 ? total / tour.reviews.length : 0;
    tour.averageRating = avgRating;

    await tour.save();

    return res.status(201).json({
      success: true,
      message: "Review added successfully!",
      review,
      averageRating: tour.averageRating,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to add review." });
  }
};

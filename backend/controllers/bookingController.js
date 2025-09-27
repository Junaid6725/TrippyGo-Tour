import Booking from "../models/bookingModel.js";
import Tour from "../models/tourModel.js";
import User from "../models/userModel.js";

export const createBooking = async (req, res) => {
  try {
    const { tourId } = req.params;
    const { fullName, phoneNumber, bookingDate, totalMembers } = req.body;

    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Login Required!",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const email = user.email;

    const tour = await Tour.findById(tourId);
    const price = tour.expenditure;

    if (!fullName || !phoneNumber || !bookingDate || !totalMembers) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }
    const totalprice = price * totalMembers;

    const existingBooking = await Booking.findOne({ tourId, userId });
    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: "You have already submitted the form for this tour",
      });
    }

    const booking = await Booking.create({
      userId,
      tourId,
      fullName,
      email,
      phoneNumber,
      bookingDate,
      totalMembers,
      bookingTotal: totalprice,
      bookingStatus: "pending",
    });
    return res.status(201).json({
      success: true,
      message: "Booking created successfully!",
      booking,
    });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getBookings = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const bookings = await Booking.find().skip(skip).limit(limit);

    const total = await Booking.countDocuments();

    if (!bookings || bookings.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Bookings Not Found!" });
    }
    return res.status(200).json({
      success: true,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      bookings,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const total = await Booking.countDocuments({ userId });

    const bookings = await Booking.find({ userId })
      .populate("tourId")
      .skip(skip)
      .limit(limit);

    if (bookings.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No Bookings Found!" });
    }

    return res.status(200).json({
      success: true,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      bookings,
    });
  } catch (error) {
    console.error("Error in getUserBookings:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { bookingStatus } = req.body;

    // Allowed statuses
    const validStatuses = ["pending", "confirmed", "rejected"];
    if (!validStatuses.includes(bookingStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking status",
      });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { bookingStatus },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Booking status updated successfully",
      booking: updatedBooking,
    });
  } catch (error) {
    console.error("Error updating booking status:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

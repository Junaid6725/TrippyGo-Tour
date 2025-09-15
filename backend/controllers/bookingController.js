import Booking from "../models/bookingModel.js";
import User from "../models/userModel.js";

export const createBooking = async (req, res) => {
  try {
    const { tourId } = req.params;
    const { fullName, phoneNumber, bookingDate, totalMembers } = req.body;

    // user info JWT se
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Login Required!",
      });
    }

    // user ka email fetch
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const email = user.email;

    // 🛠️ Required fields check
    if (!fullName || !phoneNumber || !bookingDate || !totalMembers) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }

    // 🚫 Check if same user already booked same tour
    const existingBooking = await Booking.findOne({ tourId, userId });
    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: "You have already submitted the form for this tour",
      });
    }

    // 🎯 New booking create
    const booking = await Booking.create({
      userId,
      tourId,
      fullName,
      email,
      phoneNumber,
      bookingDate,
      totalMembers,
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

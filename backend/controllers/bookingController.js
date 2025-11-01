import Booking from "../models/bookingModel.js";
import Tour from "../models/tourModel.js";
import User from "../models/userModel.js";
import dayjs from "dayjs";

export const createBooking = async (req, res) => {
  try {
    const { tourId } = req.params;
    const { fullName, phoneNumber, startDate, totalMembers } = req.body;

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
    if (!tour) {
      return res
        .status(404)
        .json({ success: false, message: "Tour not found" });
    }

    const price = tour.expenditure;

    if (!fullName || !phoneNumber || !startDate || !totalMembers) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }

    const durationDays = parseInt(tour.duration);
    if (isNaN(durationDays)) {
      return res.status(400).json({
        success: false,
        message: "Invalid tour duration",
      });
    }
    const start = dayjs(startDate);
    const end = start.add(durationDays - 1, "day").toDate();

    const totalprice = price * totalMembers;

    const existingBooking = await Booking.findOne({
      tourId,
      userId,
      startDate: { $lte: end },
      endDate: { $gte: start },
    });
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
      startDate: start.toDate(),
      endDate: end,
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
    // --- pagination params (sanitized) ---
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, parseInt(req.query.limit) || 5);
    const skip = (page - 1) * limit;
    const search = (req.query.search || "").trim();

    // --- build filter (handle search across related models) ---
    let filter = {};

    if (search) {
      // Find matching users and tours first (case-insensitive)
      const [matchedUsers, matchedTours] = await Promise.all([
        User.find({
          $or: [
            { fullName: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
          ],
        }).select("_id"),
        Tour.find({
          $or: [
            { title: { $regex: search, $options: "i" } },
            { location: { $regex: search, $options: "i" } },
          ],
        }).select("_id"),
      ]);

      const userIds = matchedUsers.map((u) => u._id);
      const tourIds = matchedTours.map((t) => t._id);

      // If neither users nor tours matched, return empty result quickly
      if (userIds.length === 0 && tourIds.length === 0) {
        return res.status(200).json({
          success: true,
          total: 0,
          page,
          limit,
          totalPages: 0,
          bookings: [],
          pending: 0,
          confirmed: 0,
          rejected: 0,
          completed: 0,
          expired: 0,
          cancelled: 0,
          message: "No bookings found",
        });
      }

      filter = {
        $or: [
          ...(userIds.length ? [{ userId: { $in: userIds } }] : []),
          ...(tourIds.length ? [{ tourId: { $in: tourIds } }] : []),
        ],
      };
    }

    // --- get total bookings and pending bookings ---
    const [total, pending, confirmed, rejected, completed, expired, cancelled] =
      await Promise.all([
        Booking.countDocuments(filter),
        Booking.countDocuments({ ...filter, bookingStatus: "pending" }),
        Booking.countDocuments({ ...filter, bookingStatus: "confirmed" }),
        Booking.countDocuments({ ...filter, bookingStatus: "rejected" }),
        Booking.countDocuments({ ...filter, bookingStatus: "completed" }),
        Booking.countDocuments({ ...filter, bookingStatus: "expired" }),
        Booking.countDocuments({ ...filter, bookingStatus: "cancelled" }),
      ]);

    // --- fetch bookings (sorted, populated, paginated) ---
    const bookings = await Booking.find(filter)
      .populate("userId", "fullName email")
      .populate("tourId", "title duration expenditure")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // --- safe response even when empty ---
    return res.status(200).json({
      success: true,
      total,
      pending,
      confirmed,
      rejected,
      completed,
      expired,
      cancelled,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 0,
      bookings,
    });
  } catch (error) {
    console.error("getBookings error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error: Failed to fetch bookings",
    });
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
      .populate("tourId", " duration expenditure location")
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

    const validStatuses = [
      "pending",
      "confirmed",
      "rejected",
      "cancelled",
      "expired",
      "completed",
    ];
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

export const cancleBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (booking.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You can only cancel your own booking",
      });
    }

    if (
      ["rejected", "completed", "expired", "cancelled"].includes(
        booking.bookingStatus
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Booking cannot be cancelled",
      });
    }

    const now = new Date();
    if (new Date(booking.startDate) <= now) {
      return res.status(400).json({
        success: false,
        message: "You cannot cancel a tour that has already started",
      });
    }

    booking.bookingStatus = "cancelled";
    booking.cancelledAt = now;
    await booking.save();

    return res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      booking,
    });
  } catch (error) {
    console.error("Cancel booking error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// export const getBookings = async (req, res) => {
//   try {
//     // --- pagination params (sanitized) ---
//     const page = Math.max(1, parseInt(req.query.page) || 1);
//     const limit = Math.max(1, parseInt(req.query.limit) || 5);
//     const skip = (page - 1) * limit;
//     const search = (req.query.search || "").trim();

//     // --- build filter (handle search across related models) ---
//     let filter = {};

//     if (search) {
//       // Find matching users and tours first (case-insensitive)
//       const [matchedUsers, matchedTours] = await Promise.all([
//         User.find({
//           $or: [
//             { fullName: { $regex: search, $options: "i" } },
//             { email: { $regex: search, $options: "i" } },
//           ],
//         }).select("_id"),
//         Tour.find({
//           $or: [
//             { title: { $regex: search, $options: "i" } },
//             { location: { $regex: search, $options: "i" } },
//           ],
//         }).select("_id"),
//       ]);

//       const userIds = matchedUsers.map((u) => u._id);
//       const tourIds = matchedTours.map((t) => t._id);

//       // If neither users nor tours matched, return empty result quickly
//       if (userIds.length === 0 && tourIds.length === 0) {
//         return res.status(200).json({
//           success: true,
//           total: 0,
//           page,
//           limit,
//           totalPages: 0,
//           bookings: [],
//           message: "No bookings found",
//         });
//       }

//       filter = {
//         $or: [
//           ...(userIds.length ? [{ userId: { $in: userIds } }] : []),
//           ...(tourIds.length ? [{ tourId: { $in: tourIds } }] : []),
//         ],
//       };
//     }

//     // --- get total with same filter ---
//     const total = await Booking.countDocuments(filter);

//     // --- fetch bookings (sorted, populated, paginated) ---
//     const bookings = await Booking.find(filter)
//       .populate("userId", "fullName email")
//       .populate("tourId", "title duration expenditure")
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit);

//     const pending = (await bookings.bookingStatus) === "pending";
//     // --- safe response even when empty ---
//     return res.status(200).json({
//       success: true,
//       total,
//       page,
//       limit,
//       totalPages: Math.ceil(total / limit) || 0,
//       bookings,
//     });
//   } catch (error) {
//     console.error("getBookings error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Server Error: Failed to fetch bookings",
//     });
//   }
// };

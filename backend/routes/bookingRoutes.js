import express from "express";
import {
  createBooking,
  getBookings,
  getUserBookings,
} from "./../controllers/bookingController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  adminMiddleware,
  userMiddleware,
} from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post(
  "/booking-tour/:tourId",
  authMiddleware,
  userMiddleware,
  createBooking
);

router.get("/get-bookings", authMiddleware, adminMiddleware, getBookings);

router.get("/user-bookings", authMiddleware, userMiddleware, getUserBookings);

export default router;

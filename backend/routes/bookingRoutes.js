import express from "express";
import {
  createBooking,
  getBookings,
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

export default router;

import express from "express";
import { createBooking } from "./../controllers/bookingController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { userMiddleware } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post(
  "/booking-tour/:tourId",
  authMiddleware,
  userMiddleware,
  createBooking
);

export default router;

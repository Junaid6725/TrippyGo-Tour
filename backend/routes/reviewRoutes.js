import express from "express";
import { addReview, getTourReviews } from "../controllers/reviewController.js";
import { authMiddleware } from "./../middlewares/authMiddleware.js";
import { userMiddleware } from "./../middlewares/roleMiddleware.js";

const router = express.Router();

router.post(
  "/tour/:id/create-review",
  authMiddleware,
  userMiddleware,
  addReview
);

router.get("/tours/:id/reviews", getTourReviews);

export default router;

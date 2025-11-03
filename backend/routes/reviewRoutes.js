import express from "express";
import { addReview } from "../controllers/reviewController.js";
import { authMiddleware } from "./../middlewares/authMiddleware.js";
import { userMiddleware } from "./../middlewares/roleMiddleware.js";

const router = express.Router();

router.post("/reviews/:tourId", authMiddleware, userMiddleware, addReview);

export default router;

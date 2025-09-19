import express from "express";
import {
  createTour,
  deleteTour,
  getAllTours,
  getTour,
  updatedTour,
} from "../controllers/tourController.js";
import { adminMiddleware } from "../middlewares/roleMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.post(
  "/create-tour",
  authMiddleware,
  adminMiddleware,
  upload.single("tourImage"),
  createTour
);
router.put(
  "/update-tour/:id",
  authMiddleware,
  adminMiddleware,
  upload.single("tourImage"),
  updatedTour
);
router.delete("/delete-tour/:id", authMiddleware, adminMiddleware, deleteTour);

router.get("/get-tours", getAllTours);

router.get("/get-tour/:id", getTour);

export default router;

import express from "express";
import {
  createTour,
  deleteTour,
  getAllTours,
  getTour,
  getToursByDestination,
  searchTour,
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
  upload.single("tourImg"),
  createTour
);
router.put(
  "/update-tour/:id",
  authMiddleware,
  adminMiddleware,
  upload.single("tourImg"),
  updatedTour
);
router.delete("/delete-tour/:id", authMiddleware, adminMiddleware, deleteTour);

router.get("/get-tours", getAllTours);

router.get("/get-tour/:id", getTour);

router.get("/destination", getToursByDestination);

router.get("/search-tour", searchTour);

export default router;

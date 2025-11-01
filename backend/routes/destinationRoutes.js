import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/roleMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";
import {
  createDestination,
  getDestinations,
} from "../controllers/destinationController.js";

const router = express.Router();

router.post(
  "/create-destination",
  authMiddleware,
  adminMiddleware,
  upload.single("destinationImg"),
  createDestination
);

router.get(
  "/get-destinations",
  authMiddleware,
  adminMiddleware,
  getDestinations
);

export default router;

import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/roleMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";
import {
  createDestination,
  deleteDestination,
  getAdminDestinations,
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

router.get("/get-destinations", getDestinations);

router.get(
  "/admin-destinations",
  authMiddleware,
  adminMiddleware,
  getAdminDestinations
);

router.delete(
  "/delete-destination/:id",
  authMiddleware,
  adminMiddleware,
  deleteDestination
);

export default router;

import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/roleMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";
import {
  createDestination,
  deleteDestination,
  getAdminDestinations,
  getAllDestinations,
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

router.get(
  "/get-all-destinations",
  authMiddleware,
  adminMiddleware,
  getAllDestinations
);

export default router;

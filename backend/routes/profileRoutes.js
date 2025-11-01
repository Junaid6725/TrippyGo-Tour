import {
  changePassword,
  createProfile,
  getProfile,
  updateProfile,
} from "../controllers/profileController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { userMiddleware } from "../middlewares/roleMiddleware.js";
import { upload } from "./../middlewares/uploadMiddleware.js";
import express from "express";

const router = express.Router();

router.get("/get-profile", authMiddleware, getProfile);
router.post(
  "/create-profile",
  authMiddleware,
  userMiddleware,
  upload.single("profileImage"),
  createProfile
);
router.put(
  "/update-profile",
  authMiddleware,
  userMiddleware,
  upload.single("profileImage"),
  updateProfile
);

router.put("/change-password", authMiddleware, userMiddleware, changePassword);

export default router;

import express from "express";
import {
  getAllUsers,
  getProfile,
  updateProfile,
  createProfile,
  deleteUser,
} from "../controllers/userController.js";
import { authMiddleware } from "./../middlewares/authMiddleware.js";
import {
  adminMiddleware,
  userMiddleware,
} from "./../middlewares/roleMiddleware.js";
import { upload } from "./../middlewares/uploadMiddleware.js";

const router = express.Router();

router.get("/get-users", authMiddleware, adminMiddleware, getAllUsers);

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
router.delete("/delete-user/:id", authMiddleware, adminMiddleware, deleteUser);

export default router;

import express from "express";
import {
  getAllUsers,
  getProfile,
  userProfile,
} from "../controllers/userController.js";
import { authMiddleware } from "./../middlewares/authMiddleware.js";
import {
  adminMiddleware,
  userMiddleware,
} from "./../middlewares/roleMiddleware.js";
import { upload } from "./../middlewares/uploadMiddleware.js";

const router = express.Router();

router.get("/get-users", authMiddleware, adminMiddleware, getAllUsers);

router.get("/get-profile", authMiddleware, userMiddleware, getProfile);

router.post(
  "/create-profile",
  authMiddleware,
  upload.single("img"),
  userProfile
);

export default router;

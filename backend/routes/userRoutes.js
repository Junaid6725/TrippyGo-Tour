import express from "express";
import { getAllUsers } from "../controllers/userController.js";
import { authMiddleware } from "./../middlewares/authMiddleware.js";
import { adminMiddleware } from "./../middlewares/roleMiddleware.js";

const router = express.Router();

router.get("/get-users", authMiddleware, adminMiddleware, getAllUsers);

export default router;

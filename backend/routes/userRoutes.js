import express from "express";
import { getAllUsers, deleteUser } from "../controllers/userController.js";
import { authMiddleware } from "./../middlewares/authMiddleware.js";
import { adminMiddleware } from "./../middlewares/roleMiddleware.js";

const router = express.Router();

router.get("/get-users", authMiddleware, adminMiddleware, getAllUsers);

router.delete("/delete-user/:id", authMiddleware, adminMiddleware, deleteUser);

export default router;

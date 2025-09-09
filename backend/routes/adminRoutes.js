import express from "express";
import { authMiddleware } from "./../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/verify", authMiddleware, (req, res) => {
  res.json({ valid: true, user: req.user });
});

export default router;

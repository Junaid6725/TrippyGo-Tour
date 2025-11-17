import express from "express";
import { loginUser, registerUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/api/register", registerUser);
router.post("/api/login", loginUser);
router.get("/",(req,res)=>{
  res.send("Hello from server!")
})

export default router;

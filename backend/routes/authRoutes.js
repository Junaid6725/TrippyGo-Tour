import express from "express";
import { loginUser, registerUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
// router.get("/",(req,res)=>{
//   res.send("Hello from server!")
// })

export default router;

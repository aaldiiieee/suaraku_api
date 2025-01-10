import express from "express";
import { register, login, registerPin, pin } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/register-pin", registerPin);
router.post("/pin", pin);
// router.post("/login/verify-otp", verifyOtp);

export default router;
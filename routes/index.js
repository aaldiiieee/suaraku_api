import express from "express";
import healthTestRoutes from "./healthTestRoutes.js";
import userRoutes from "./userRoutes.js";
import authRoutes from "./authRoutes.js";
import regionRoutes from "./regionRoutes.js";

const router = express.Router();

router.use("/health", healthTestRoutes);
router.use("/user", userRoutes);
router.use("/auth", authRoutes);
router.use("/region", regionRoutes);

export default router;

import express from "express";
import { healthTest } from "../controllers/healthTest.js";

const router = express.Router();

router.get("/health-check", healthTest);

export default router;
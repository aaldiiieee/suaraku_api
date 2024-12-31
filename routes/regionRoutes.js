import express from "express";
import { getProvinces, getCities, getDistricts } from "../controllers/regionController.js";

const router = express.Router();

router.get("/provinces", getProvinces);
router.get("/cities/:provinceId", getCities);
router.get("/districts/:cityId", getDistricts);

export default router;
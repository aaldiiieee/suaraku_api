import express from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updatePhoneNumber,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/get-all-users", getAllUsers);
router.get("/get-user/:id", getUserById);
router.post("/create-user", createUser);
router.put("/update-phone-number/:uuid", updatePhoneNumber);

export default router;

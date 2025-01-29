import express from "express";
import upload from "../config/multer.js";
import {
  getAllUsers,
  getUserById,
  createUser,
  updatePhoneNumber,
  uploadAvatar
} from "../controllers/userController.js";

const router = express.Router();

router.get("/get-all-users", getAllUsers);
router.get("/get-user/:id", getUserById);
router.post("/create-user", createUser);
router.put("/update-phone-number/:uuid", updatePhoneNumber);
router.post("/:uuid/avatar", upload.single("avatar"), uploadAvatar);

export default router;

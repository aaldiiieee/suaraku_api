import User from "../models/userModel.js";
import cloudinary from "../config/cloudinary.js";
import upload from "../config/multer.js";
import fs from "fs";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers();

    if (!users) {
      return res.status(404).json({
        message: "Users not found",
        status: 404,
        success: false,
      });
    }

    res.status(200).json({
      message: "Users fetched successfully",
      status: 200,
      success: true,
      data: users,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.getUserById(req.params.id);
    if (user) {
      res.status(200).json({
        message: "User fetched successfully",
        status: 200,
        success: true,
        data: user,
      });
    } else {
      res.status(404).json({
        message: "User not found",
        status: 404,
        success: false,
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
      message: "Failed to fetch user",
      status: 500,
    });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = await User.createUser({ name, email });

    if (!newUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updatePhoneNumber = async (req, res) => {
  try {
    const headers = req.headers;

    if (!headers.authorization) {
      return res.status(401).json({ 
        message: "Unauthorized",
        status: 401,
      });
    }

    const token = headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ 
        message: "Unauthorized Token",
        status: 401,
      });
    }

    const { uuid } = req.params;
    const { phoneNumber } = req.body;

    const updatedUser = await User.updatePhoneNumber(uuid, phoneNumber);

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
        status: 404,
        success: false,
      });
    }

    res.status(200).json({
      message: "User phone number updated successfully",
      status: 200,
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Failed to update user phone number",
      status: 500,
    });
  }
};

export const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded!",
        status: 400,
        success: false,
      });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'avatars',
    });

    fs.unlinkSync(req.file.path);

    const { uuid } = req.params;
    const updatedUser = await User.updateUserAvatar(uuid, result.secure_url);

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
        status: 404,
        success: false,
      });
    }

    res.status(200).json({
      message: "Avatar uploaded successfully!",
      status: 200,
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message,
      message: "Failed to upload avatar",
      status: 500,
      success: false,
    });
  }
}
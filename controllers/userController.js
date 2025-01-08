import User from "../models/userModel.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers();

    if (!users) {
      return res.status(404).json({ 
        message: "Users not found",
        status: 404,
        success: false
      });
    }

    res.status(200).json({
      message: "Users fetched successfully",
      status: 200,
      success: true,
      data: users
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
        data: user
      });
    } else {
      res.status(404).json({
        message: "User not found",
        status: 404,
        success: false
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

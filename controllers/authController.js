import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export const register = async (req, res) => {
  const {
    mu_nik,
    mu_phoneNumber,
    mu_password,
    mu_address,
    mu_province,
    mu_city,
    mu_district,
  } = req.body;

  try {
    const existingUser = await prisma.mst_users.findUnique({
      where: { mu_nik },
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "User dengan NIK ini sudah terdaftar.",
      });
    }

    const hashedPassword = await bcrypt.hash(mu_password, 10);

    const newUser = await prisma.mst_users.create({
      data: {
        mu_nik,
        mu_phoneNumber,
        mu_password: hashedPassword,
        mu_address,
        mu_province,
        mu_city,
        mu_district,
      },
    });

    res.status(201).json({
      success: true,
      status: 201,
      message: "Registrasi berhasil.",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Terjadi kesalahan pada server.",
      error: error.message,
    });
    console.error(error);
  }
};

export const login = async (req, res) => {
  const { mu_nik, mu_password } = req.body;

  try {
    const user = await prisma.mst_users.findUnique({
      where: { mu_nik },
    });

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan." });
    }

    const isPasswordValid = await bcrypt.compare(mu_password, user.mu_password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Password salah." });
    }

    const token = jwt.sign(
      { mu_id: user.mu_id, mu_nik: user.mu_nik },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login berhasil.",
      status: 200,
      token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Terjadi kesalahan.", error: error.message });
  }
};

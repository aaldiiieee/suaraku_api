import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import twilio from "twilio";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;
const TWILIO_SERVICE_SID = process.env.TWILIO_SERVICE_SID;

const twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

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
  const { mu_nik, mu_phoneNumber, mu_password } = req.body;

  try {
    const user = await prisma.mst_users.findUnique({
      where: { mu_nik },
    });

    if (!user) {
      return res.status(404).json({
        message: "User tidak ditemukan.",
        status: 404,
        success: false,
      });
    }

    if (user.mu_nik !== mu_nik) {
      return res.status(401).json({
        message: "NIK salah.",
        status: 401,
        success: false,
      });
    }

    if (user.mu_phoneNumber !== mu_phoneNumber) {
      return res.status(401).json({
        message: "Nomor telepon salah.",
        status: 401,
        success: false,
      });
    }

    const isPasswordValid = await bcrypt.compare(mu_password, user.mu_password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Password salah.",
        status: 401,
        success: false,
      });
    }

    // const token = jwt.sign(
    //   { mu_id: user.mu_id, mu_nik: user.mu_nik },
    //   JWT_SECRET,
    //   { expiresIn: "1h" }
    // );

    const verification = await twilioClient.verify.v2
      .services(TWILIO_SERVICE_SID)
      .verifications.create({
        to: TWILIO_PHONE_NUMBER,
        channel: "sms",
      });

    res.status(200).json({
      message: "OTP telah dikirim ke nomor telepon Anda.",
      status: 200,
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Terjadi kesalahan.", error: error.message });
  }
};

export const verifyOtp = async (req, res) => {
  const { otp_number, mu_nik } = req.body;

  try {
    const existingUser = await prisma.mst_users.findUnique({
      where: { mu_nik },
    });

    if (!existingUser) {
      return res.status(404).json({ message: "User tidak ditemukan." });
    }

    const verification = await twilioClient.verify.v2
      .services(TWILIO_SERVICE_SID)
      .verificationChecks.create({
        to: TWILIO_PHONE_NUMBER,
        code: otp_number,
      });
    console.log("Verification Check: ", verification);

    if (verification.status !== "approved") {
      return res.status(400).json({ message: "OTP tidak valid." });
    }

    const token = jwt.sign(
      { mu_id: existingUser.mu_id, mu_nik: existingUser.mu_nik },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login berhasil.",
      status: 200,
      success: true,
      token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Terjadi kesalahan.", error: error.message });
  }
};

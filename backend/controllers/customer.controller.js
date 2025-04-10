import { redis } from "../config/redis.js";
import User from "../models/customer.model.js";
import Contact from "../models/contact.model.js";
import Booking from "../models/booking.model.js";
import removeBackground from "@imgly/background-removal-node";
import jwt from "jsonwebtoken";
import fs from "fs";
import VisitorCount from "../models/VisitorCount.model.js";
import BookingCount from "../models/bookingCount.model.js";

export const generateTokens = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

export const storeRefreshToken = async (userId, refreshToken) => {
  await redis.set(
    `refresh_token:${userId}`,
    refreshToken,
    "EX",
    7 * 24 * 60 * 60
  ); // 7days
};

export const setCookies = (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

export const getVisitorCount = async (req, res) => {
  try {
    const currentDay = new Date()
      .toLocaleString("en-us", { weekday: "long" })
      .toLowerCase();

    await VisitorCount.incrementCount(currentDay);

    res.status(200).send("Visitor count updated successfully.");
  } catch (err) {
    console.error("Error updating visitor count:", err);
    res.status(500).send("Error updating visitor count.");
  }
};

export const registerUser = async (req, res) => {
  const user = req.body;
  try {
    const userExists = await User.findOne({ email: user.email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    await User.create(user);

    const { accessToken, refreshToken } = generateTokens(user._id);
    await storeRefreshToken(user._id, refreshToken);

    setCookies(res, accessToken, refreshToken);

    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      const { accessToken, refreshToken } = generateTokens(user._id);
      await storeRefreshToken(user._id, refreshToken);
      setCookies(res, accessToken, refreshToken);

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      res.status(400).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      await redis.del(`refresh_token:${decoded.userId}`);
    }

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const storedToken = await redis.get(`refresh_token:${decoded.userId}`);

    if (storedToken !== refreshToken) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const accessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.json({ message: "Token refreshed successfully" });
  } catch (error) {
    console.log("Error in refreshToken controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const removeBackgroundController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const imgPath = req.file.path;
    const blob = await removeBackground(imgPath);
    const buffer = Buffer.from(await blob.arrayBuffer());

    fs.unlinkSync(imgPath); // Delete temp file

    const dataURL = `data:image/png;base64,${buffer.toString("base64")}`;
    res.json({ image: dataURL });
  } catch (error) {
    res.status(500).json({ error: "Error removing background" });
  }
};

//Contact

export const contact = async (req, res) => {
  try {
    const contact = req.body;
    const newContact = await Contact.create(contact);
    res.status(201).json(newContact);
  } catch (error) {
    console.log("Error in contact controller", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Booking
export const booking = async (req, res) => {
  try {
    const booking = req.body;
    const newBooking = await Booking.create(booking);
    const currentDay = new Date()
      .toLocaleString("en-us", { weekday: "long" })
      .toLowerCase();

    await BookingCount.incrementCount(currentDay);
    res.status(201).json(newBooking);
  } catch (error) {
    console.log("Error in booking controller", error.message);
    res.status(500).json({ message: error.message });
  }
};

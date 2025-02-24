import express from "express";
import {
  changeOpeningHours,
  closeDay,
  openDay,
  getClosedDays,
  getOpeningHours,
} from "../controllers/bookingDays.controller.js";

const router = express.Router();

// Routes for opening hours management
router.post("/change-hours", changeOpeningHours);
router.get("/hours", getOpeningHours);
router.post("/close-day", closeDay);
router.delete("/open-day", openDay);
router.get("/closed-days", getClosedDays);

export default router;

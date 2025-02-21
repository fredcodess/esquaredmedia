import express from "express";
import {
  deleteContact,
  getContact,
  getUpdateContact,
  sendEmailResponse,
} from "../controllers/admin.controller.js";
import {
  deleteBooking,
  getBooking,
  getUpdateBooking,
  sendEmailResponsee,
} from "../controllers/booking.controller.js";
// import { protectRoute } from "../middlewares/auth.middleware.js";
// import upload from "../middlewares/multer.middleware.js";

const router = express.Router();

router.get("/enquiries", getContact);
router.get("/enquiries/:id", getUpdateContact);
router.delete("/enquiries/:id", deleteContact);
router.post("/respond/:id", sendEmailResponse);

// booking
router.get("/manage-bookings", getBooking);
router.get("/manage-bookings/:id", getUpdateBooking);
router.delete("/manage-bookings/:id", deleteBooking);
router.post("/email-respond/:id", sendEmailResponsee);

export default router;

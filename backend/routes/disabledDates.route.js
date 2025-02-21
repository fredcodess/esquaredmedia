import express from "express";
const router = express.Router();
import {
  deleteDisabledDates,
  getDisableDates,
  postDisabledDates,
} from "../controllers/disabledDates.controller.js";

router.get("/dates", getDisableDates);

router.post("/dates", postDisabledDates);

router.delete("/dates/:id", deleteDisabledDates);

export default router;

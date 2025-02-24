import CloseDay from "../models/closeDay.model.js";
import { formatISO } from "date-fns";
import Day from "../models/day.model.js";

/**
 * Change opening hours for multiple days
 */
export const changeOpeningHours = async (req, res, next) => {
  try {
    const days = req.body;

    if (!Array.isArray(days) || days.length === 0) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const results = await Promise.all(
      days.map(async (day) => {
        const updatedDay = await Day.findOneAndUpdate(
          { name: day.name },
          {
            openTime: day.openTime,
            closeTime: day.closeTime,
            dayOfWeek: day.dayOfWeek, // Ensure `dayOfWeek` is always present
          },
          { new: true, upsert: true }
        );

        return updatedDay;
      })
    );

    res.json(results);
  } catch (error) {
    next(error);
  }
};

/**
 * Get all opening hours
 */
export const getOpeningHours = async (req, res, next) => {
  try {
    const openingHours = await Day.find().lean(); // Assuming you're using the Day model to store the opening hours

    if (!openingHours) {
      return res.status(404).json({ message: "Opening hours not found" });
    }

    res.json(openingHours); // Respond with the opening hours data
  } catch (error) {
    next(error);
  }
};

/**
 * Close a day (prevent appointments)
 */
export const closeDay = async (req, res, next) => {
  try {
    const { date } = req.body;

    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    const closedDay = await CloseDay.create({ date });
    res.status(201).json({ message: "Day closed", closedDay });
  } catch (error) {
    next(error);
  }
};

/**
 * Open a previously closed day (allow appointments)
 */
export const openDay = async (req, res, next) => {
  try {
    const { date } = req.body;

    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    const result = await CloseDay.deleteOne({ date });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "Date not found or already open" });
    }

    res.json({ message: "Day opened successfully" });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all closed days
 */
export const getClosedDays = async (req, res, next) => {
  try {
    const closedDays = await CloseDay.find().lean();

    const formattedDates = closedDays.map((day) => formatISO(day.date));

    res.json(formattedDates);
  } catch (error) {
    next(error);
  }
};

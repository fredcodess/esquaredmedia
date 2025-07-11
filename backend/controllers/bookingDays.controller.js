import CloseDay from "../models/closeDay.model.js";
import { formatISO } from "date-fns";
import Day from "../models/day.model.js";

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
            dayOfWeek: day.dayOfWeek,
          },
          { new: true, upsert: true }
        );

        return updatedDay;
      })
    );

    res.json(results);
  } catch (error) {
    console.error("Error in changeOpeningHours:", error);
    next(error);
  }
};

export const getOpeningHours = async (req, res, next) => {
  try {
    const openingHours = await Day.find().lean();
    if (!openingHours || openingHours.length === 0) {
      return res.status(404).json({ message: "Opening hours not found" });
    }
    res.json(openingHours);
  } catch (error) {
    console.error("Error in getOpeningHours:", error);
    next(error);
  }
};

export const closeDay = async (req, res, next) => {
  try {
    const { date } = req.body;

    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    parsedDate.setUTCHours(0, 0, 0, 0);

    const closedDay = await CloseDay.create({ date: parsedDate });
    res.status(201).json({ message: "Day closed", closedDay });
  } catch (error) {
    console.error("Error in closeDay:", error);
    if (error.code === 11000) {
      return res.status(400).json({ message: "Date already closed" });
    }
    next(error);
  }
};

export const openDay = async (req, res, next) => {
  try {
    const { date } = req.body;

    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ message: "Invalid date format" });
    }
    parsedDate.setUTCHours(0, 0, 0, 0);

    const result = await CloseDay.deleteOne({ date: parsedDate });
    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "Date not found or already open" });
    }

    res.json({ message: "Day opened successfully" });
  } catch (error) {
    console.error("Error in openDay:", error);
    next(error);
  }
};

export const getClosedDays = async (req, res, next) => {
  try {
    const closedDays = await CloseDay.find().lean();
    console.log("Fetched closed days:", closedDays);

    const formattedDates = closedDays
      .map((day, index) => {
        if (!day.date || isNaN(new Date(day.date).getTime())) {
          console.warn(`Invalid date at index ${index}:`, day.date);
          return null;
        }
        return formatISO(day.date, { representation: "date" });
      })
      .filter((date) => date !== null);

    res.json(formattedDates);
  } catch (error) {
    console.error("Error in getClosedDays:", error);
    next(error);
  }
};

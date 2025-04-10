import mongoose from "mongoose";
import { BookingCountModel } from "../models/bookingCount.model.js";
import { VisitorCountModel } from "../models/VisitorCount.model.js";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Connected to MongoDB");

    const existingBooking = await BookingCountModel.findOne();
    if (!existingBooking) {
      await BookingCountModel.create({});
      console.log("Booking counts initialized");
    }
    // Initialize Visitor Counts
    const existingVisitor = await VisitorCountModel.findOne();
    if (!existingVisitor) {
      await VisitorCountModel.create({});
      console.log(" Visitor counts initialized");
    }
  } catch (error) {
    console.log("Error connecting to MongoDB", error.message);
  }
};

export default connectToMongoDB;

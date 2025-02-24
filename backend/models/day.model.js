import mongoose from "mongoose";

const daySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Sunday, Monday, etc.
  dayOfWeek: { type: Number, required: true }, // 0 = Sunday, 1 = Monday, etc.
  openTime: { type: String, required: true }, // "08:00"
  closeTime: { type: String, required: true }, // "13:00"
});

const Day = mongoose.model("Day", daySchema);
export default Day;

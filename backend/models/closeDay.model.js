import mongoose from "mongoose";

const closeDaySchema = new mongoose.Schema({
  date: { type: Date, required: true, unique: true },
});

const CloseDay = mongoose.model("ClosedDay", closeDaySchema);

export default CloseDay;

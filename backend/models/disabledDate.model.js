import mongoose from "mongoose";

const DisabledDateSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true, unique: true },
  },
  { timestamps: true }
);

const DisabledDate = mongoose.model("DisabledDate", DisabledDateSchema);

export default DisabledDate;

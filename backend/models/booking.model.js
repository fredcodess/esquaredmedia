import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    event_type: {
      type: String,
      required: true,
    },
    service_type: {
      type: String,
      required: true,
    },
    event_date: {
      type: Date,
      required: true,
      unique: true,
    },
    event_time: {
      type: String,
      required: true,
    },
    event_location: {
      type: String,
      required: true,
    },
    additional_info: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;

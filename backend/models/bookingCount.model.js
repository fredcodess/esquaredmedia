import mongoose from "mongoose";

const bookingCountSchema = new mongoose.Schema({
  sunday: { type: Number, default: 0 },
  monday: { type: Number, default: 0 },
  tuesday: { type: Number, default: 0 },
  wednesday: { type: Number, default: 0 },
  thursday: { type: Number, default: 0 },
  friday: { type: Number, default: 0 },
  saturday: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now, expires: "7d" },
});

const BookingCountModel = mongoose.model("BookingCount", bookingCountSchema);

class BookingCount {
  static async incrementCount(day) {
    const validDays = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];

    if (!validDays.includes(day)) {
      throw new Error("Invalid day provided");
    }

    try {
      const result = await BookingCountModel.findOneAndUpdate(
        {},
        { $inc: { [day]: 1 } },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      console.log(`Booking count for ${day} updated.`);
      return result;
    } catch (err) {
      console.error("Error incrementing booking count:", err);
      throw err;
    }
  }

  static async getCounts() {
    try {
      const result = await BookingCountModel.findOne().lean();
      return (
        result || {
          sunday: 0,
          monday: 0,
          tuesday: 0,
          wednesday: 0,
          thursday: 0,
          friday: 0,
          saturday: 0,
        }
      );
    } catch (err) {
      console.error("Error fetching booking counts:", err);
      throw err;
    }
  }
}

export { BookingCountModel };
export default BookingCount;

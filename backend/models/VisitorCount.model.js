import mongoose from "mongoose";

const visitorCountSchema = new mongoose.Schema({
  sunday: { type: Number, default: 0 },
  monday: { type: Number, default: 0 },
  tuesday: { type: Number, default: 0 },
  wednesday: { type: Number, default: 0 },
  thursday: { type: Number, default: 0 },
  friday: { type: Number, default: 0 },
  saturday: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now, expires: "7d" },
});

const VisitorCountModel = mongoose.model("VisitorCount", visitorCountSchema);

class VisitorCount {
  static async incrementCount(day) {
    if (!visitorCountSchema.paths.hasOwnProperty(day)) {
      throw new Error("Invalid day provided");
    }

    try {
      const result = await VisitorCountModel.findOneAndUpdate(
        {},
        { $inc: { [day]: 1 } },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      console.log(`Visitor count for ${day} updated.`);
      return result;
    } catch (err) {
      console.error("Error incrementing visitor count:", err);
      throw err;
    }
  }

  static async getCounts() {
    try {
      const result = await VisitorCountModel.findOne().lean();
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
      console.error("Error fetching visitor counts:", err);
      throw err;
    }
  }
}

export { VisitorCountModel };
export default VisitorCount;

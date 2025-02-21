import DisabledDate from "../models/disabledDate.model.js";

export const getDisableDates = async (req, res) => {
  try {
    const dates = await DisabledDate.find();
    res.json(dates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const postDisabledDates = async (req, res) => {
  try {
    const { date } = req.body;
    if (!date) return res.status(400).json({ message: "Date is required" });

    // Check if date already exists
    const existingDate = await DisabledDate.findOne({ date });
    if (existingDate)
      return res.status(400).json({ message: "Date already disabled" });

    const newDisabledDate = new DisabledDate({ date });
    await newDisabledDate.save();
    res.status(201).json(newDisabledDate);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteDisabledDates = async (req, res) => {
  try {
    await DisabledDate.findByIdAndDelete(req.params.id);
    res.json({ message: "Date removed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

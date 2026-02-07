import mongoose from "mongoose";

const TimerSchema = new mongoose.Schema({
  isActive: { type: Boolean, default: false },
  endTime: { type: Date, default: null },
});

export default mongoose.models.Timer || mongoose.model("Timer", TimerSchema);

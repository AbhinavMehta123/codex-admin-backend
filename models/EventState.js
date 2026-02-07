import mongoose from "mongoose";

const EventStateSchema = new mongoose.Schema({
  isRunning: { type: Boolean, default: false },
  startTime: { type: Date, default: null },
});

export default mongoose.models.EventState ||
  mongoose.model("EventState", EventStateSchema);

import mongoose from "mongoose";

const EventInfoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logoUrl: { type: String, required: true },
  posterUrl: { type: String, required: true }, 
  overview: { type: String, required: true },
  moreInfo: {type: String, require: true},
  rules: { type: [String], required: true },
});

export default mongoose.models.EventInfo || mongoose.model("EventInfo", EventInfoSchema);

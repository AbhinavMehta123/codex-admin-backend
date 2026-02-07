import mongoose from "mongoose";
const RegistrationSchema = new mongoose.Schema({
  name: String,
  email: String,
  college: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Registration ||
  mongoose.model("Registration", RegistrationSchema);
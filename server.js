import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import eventRoutes from "./routes/eventRoutes.js";

import adminRoutes from "./routes/adminRoutes.js";
import registrationRoutes from "./routes/registrationRoutes.js";
import timerRoutes from "./routes/timerRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// monogoDB connection

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
.catch(err=> console.error(err))

// define routes

app.use("/api/admin",adminRoutes)
app.use("/api/registrations", registrationRoutes);
app.use("/api/timer", timerRoutes);
app.use("/api/event", eventRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT,() => console.log(`server running on port ${PORT}`));
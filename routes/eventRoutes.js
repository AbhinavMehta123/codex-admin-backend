import express from "express";
import EventInfo from "../models/EventInfo.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// -------------------------
// Get Event Info (Public)
// -------------------------
router.get("/", async (req, res) => {
  try {
    const event = await EventInfo.findOne();
    if (!event) return res.status(404).json({ error: "Event info not found" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------------
// Update or Create Event Info (Protected - Admin Only)
// -------------------------
router.post("/", verifyToken, async (req, res) => {
  try {
    const { name, logoUrl, posterUrl, overview, moreInfo, rules } = req.body;

    const event = await EventInfo.findOneAndUpdate(
      {},
      { name, logoUrl, posterUrl, overview, moreInfo, rules },
      { new: true, upsert: true }
    );

    res.json({ success: true, message: "Event info updated successfully", event });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

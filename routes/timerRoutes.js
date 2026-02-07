import express from "express";
import Timer from "../models/Timer.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get current timer status
router.get("/", async (req, res) => {
  try {
    const timer = await Timer.findOne();
    res.json(timer || { isActive: false });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start timer (admin only)
router.post("/start", verifyToken, async (req, res) => {
  try {
    const duration = 110 * 60 * 1000; // 110 minutes in ms
    const endTime = new Date(Date.now() + duration);

    const timer = await Timer.findOneAndUpdate(
      {},
      { isActive: true, endTime },
      { new: true, upsert: true }
    );

    res.json({ success: true, timer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Stop timer (admin only)
router.post("/stop", verifyToken, async (req, res) => {
  try {
    const timer = await Timer.findOneAndUpdate(
      {},
      { isActive: false, endTime: null },
      { new: true }
    );

    res.json({ success: true, timer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

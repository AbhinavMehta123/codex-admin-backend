import express from "express";
import Registration from "../models/Registration.js";

const router = express.Router();

// Get all registered users
router.get("/", async (req, res) => {
  try {
    const users = await Registration.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
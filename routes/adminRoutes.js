import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// -------------------------
// Admin Registration 
// -------------------------
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json({ error: "Username and password required" });

    // FIX: Force lowercase and remove spaces
    const cleanUsername = username.trim().toLowerCase();

    const existing = await Admin.findOne({ username: cleanUsername });
    if (existing) {
      return res.status(400).json({ error: "Admin already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const admin = await Admin.create({ 
      username: cleanUsername, // Save clean version
      password: hashed 
    });

    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ success: true, message: "Admin account created successfully", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------------
// Admin Login 
// -------------------------
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // FIX: Force lowercase and remove spaces to match the registration format
    const cleanUsername = username.trim().toLowerCase();

    // Now searching for "abhinav" will find "abhinav", even if phone typed "Abhinav "
    const admin = await Admin.findOne({ username: cleanUsername });
    
    if (!admin) return res.status(404).json({ error: "Admin not found" });

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ success: true, message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------------
// Get Admin Data (Protected)
// -------------------------
router.get("/me", verifyToken, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id, "-password");
    if (!admin) return res.status(404).json({ error: "Admin not found" });
    res.json(admin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------------
// Check Admin Count (Public)
// -------------------------
router.get("/exists", async (req, res) => {
  try {
    const adminCount = await Admin.countDocuments();
    res.json({ adminCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------------
// ✅ Get All Admins (Protected)
// -------------------------
router.get("/all", verifyToken, async (req, res) => {
  try {
    const admins = await Admin.find({}, "-password");
    res.json(admins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

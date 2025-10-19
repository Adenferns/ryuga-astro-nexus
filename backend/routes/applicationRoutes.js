import express from "express";
import Application from "../models/Application.js";

const router = express.Router();

// POST /api/applications
router.post("/", async (req, res) => {
  console.log("Received POST:", req.body);
  try {
    const { name, email, institution, message } = req.body;

    const newApp = new Application({
      name,
      email,
      institution,
      message,
    });

    await newApp.save();
    res.status(201).json({ success: true, message: "Application submitted successfully!" });
  } catch (error) {
    console.error("Error saving application:", error);
    res.status(500).json({ success: false, message: "Server error" });
  } s
});



export default router;

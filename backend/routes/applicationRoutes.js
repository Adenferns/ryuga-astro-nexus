import express from "express";
import Application from "../models/Application.js";

const router = express.Router();

// POST /api/applications
router.post("/", async (req, res) => {
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
  }
});

// (Optional) GET route to view all applications
router.get("/", async (req, res) => {
  try {
    const applications = await Application.find();
    res.json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

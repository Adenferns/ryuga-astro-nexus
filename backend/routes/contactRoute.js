// routes/contactRoute.js
import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// POST route - Save contact form
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // validation (optional but good practice)
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();

    res.json({ success: true, message: "Message stored successfully!" });
  } catch (error) {
    console.error("Contact save error:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
});



export default router;

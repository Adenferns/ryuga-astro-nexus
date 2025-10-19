// models/Application.js
import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    institution: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

// Explicitly set collection name to match your MongoDB
export default mongoose.model("Application", applicationSchema, "Application");

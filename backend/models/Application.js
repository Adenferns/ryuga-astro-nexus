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

// 👇 Explicitly specify the collection name as 'applications' (lowercase, plural)
export default mongoose.model("Application", applicationSchema, "applications");


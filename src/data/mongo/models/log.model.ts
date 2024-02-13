import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  createdAt: { type: Date, default: new Date() },
  level: { type: String, enum: ["low", "medium", "high"], default: "low" },
  message: {
    type: String,
    required: true,
  },
  origin: { type: String },
});

export const LogModel = mongoose.model("Log", logSchema);

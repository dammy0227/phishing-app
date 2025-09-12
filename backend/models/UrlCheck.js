import mongoose from "mongoose";

const UrlCheckSchema = new mongoose.Schema({
  url: { type: String, required: true },
  label: { type: String, required: true },
  confidence: { type: Number, required: true },
  reason: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("UrlCheck", UrlCheckSchema);

// routes/predict.js
import express from "express";
import UrlCheck from "../models/UrlCheck.js";
import { predictPhishing } from "../services/modelService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "URL is required" });

    const { label, confidence, reason } = await predictPhishing(url);

    // Save to MongoDB
    await UrlCheck.create({ url, label, confidence, reason });

    res.json({ url, label, confidence, reason });
  } catch (err) {
    res.status(500).json({ error: err.message || "Prediction failed" });
  }
});

export default router;

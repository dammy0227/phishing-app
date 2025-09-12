import express from "express";
import UrlCheck from "../models/UrlCheck.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const total = await UrlCheck.countDocuments();
    const phishingCount = await UrlCheck.countDocuments({ label: "phishing" });
    const legitimateCount = await UrlCheck.countDocuments({ label: "legitimate" });

    const avgConfidenceAgg = await UrlCheck.aggregate([
      { $group: { _id: null, avgConfidence: { $avg: "$confidence" } } }
    ]);

    const avgConfidence = avgConfidenceAgg[0]?.avgConfidence || 0;

    res.json({ total, phishingCount, legitimateCount, avgConfidence });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

import express from "express";
import UrlCheck from "../models/UrlCheck.js";
import { predictPhishing } from "../services/modelService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { urls } = req.body;
    if (!Array.isArray(urls) || urls.length === 0) 
      return res.status(400).json({ error: "URLs are required" });

    const results = [];
    for (let url of urls) {
      const { label, confidence, reason } = await predictPhishing(url);
      const saved = await UrlCheck.create({ url, label, confidence, reason });
      results.push(saved);
    }

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

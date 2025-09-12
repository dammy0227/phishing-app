import express from "express";
import UrlCheck from "../models/UrlCheck.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const recent = await UrlCheck.find().sort({ createdAt: -1 }).limit(10);
    res.json(recent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

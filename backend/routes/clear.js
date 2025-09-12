import express from "express";
import UrlCheck from "../models/UrlCheck.js";

const router = express.Router();

// DELETE all records
router.delete("/", async (req, res) => {
  try {
    await UrlCheck.deleteMany({});
    res.json({ message: "All records cleared successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

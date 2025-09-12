import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import predictRoute from "./routes/predict.js";
import batchRoute from "./routes/batch.js";
import recentRoute from "./routes/recent.js";
import statsRoute from "./routes/stats.js";
import clearRoute from "./routes/clear.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors({
  origin: [
    "https://phishing-app-beta.vercel.app",
    "http://localhost:5173"
  ],
  methods: "*",   // ✅ allow all methods
  credentials: true,
}));


app.use(express.json());

app.use("/api/predict", predictRoute);
app.use("/api/batch", batchRoute);
app.use("/api/recent", recentRoute);
app.use("/api/stats", statsRoute);
app.use("/api/clear", clearRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

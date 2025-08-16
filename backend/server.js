import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import predictRoutes from "./routes/predict.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors({
  origin: [
    "https://phishing-app-beta.vercel.app", // production
    "http://localhost:5173"                 // local dev
  ],
  methods: ["GET", "POST"],
  credentials: true,
}));


app.use(express.json());

app.use("/api/predict", predictRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

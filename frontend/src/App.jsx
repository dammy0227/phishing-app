import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import UrlInput from "./components/UrlInput";
import ResultCard from "./components/ResultCard";
import BatchUpload from "./components/BatchUpload";
import ProgressBar from "./components/ProgressBar";
import RecentChecks from "./components/RecentChecks";
import StatsDashboard from "./components/StatsDashboard";
import Home from "./components/Home";
import { checkUrl, checkBatch } from "./services/api";
import "./App.css";

/* ---------- Main App Page ("/app") ---------- */
function MainApp() {
  const [result, setResult] = useState(null);
  const [batchResults, setBatchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const simulateProgress = async (steps = 4) => {
    const increment = 100 / steps;
    for (let i = 1; i <= steps; i++) {
      await new Promise((r) => setTimeout(r, 400));
      setProgress(i * increment);
    }
  };

  const handleCheck = async (url) => {
    setResult(null);
    setLoading(true);
    setProgress(0);
    try {
      await simulateProgress();
      const res = await checkUrl(url);
      setResult(res);
    } catch (err) {
      console.error(err);
      setResult({ error: "Failed to check URL" });
    } finally {
      setLoading(false);
      setProgress(100);
    }
  };

  const handleBatchCheck = async (urls) => {
    setBatchResults([]);
    setLoading(true);
    setProgress(0);
    try {
      await simulateProgress(urls.length);
      const res = await checkBatch(urls);
      setBatchResults(res);
    } catch (err) {
      console.error(err);
      setBatchResults([{ error: "Failed to check batch URLs" }]);
    } finally {
      setLoading(false);
      setProgress(100);
    }
  };

  return (
    <div className="app-container" style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>Phishing URL Checker</h1>

      <h2>Single URL Check</h2>
      <UrlInput onCheck={handleCheck} />
      {loading && <ProgressBar progress={progress} />}
      <ResultCard result={result} />

      <h2>Batch URL Check</h2>
      <BatchUpload onBatchCheck={handleBatchCheck} />
      {loading && <ProgressBar progress={progress} />}
      {batchResults.map((r, idx) => (
        <ResultCard key={idx} result={r} />
      ))}

      <RecentChecks />
      <StatsDashboard />
    </div>
  );
}

/* ---------- App Router ---------- */
export default function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ Home always shows first */}
        <Route path="/" element={<Home />} />

        {/* Main App */}
        <Route path="/app" element={<MainApp />} />

        {/* Redirect unknown routes back to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

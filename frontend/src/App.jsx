import { useState, useEffect } from "react";
import UrlInput from "./components/UrlInput";
import ResultCard from "./components/ResultCard";
import BatchUpload from "./components/BatchUpload";
import ProgressBar from "./components/ProgressBar";
import RecentChecks from "./components/RecentChecks";
import StatsDashboard from "./components/StatsDashboard";
import { checkUrl, checkBatch } from "./services/api";
import Home from "./components/Home";
import './App.css';

export default function App() {
  // null = not yet loaded, false = Home not started, true = Home started
  const [started, setStarted] = useState(null);

  const [result, setResult] = useState(null);
  const [batchResults, setBatchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // Load started from localStorage on first mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("started") === "true";
      setStarted(saved);
    }
  }, []);

  // Save started to localStorage whenever it changes
  useEffect(() => {
    if (started !== null) {
      localStorage.setItem("started", started);
    }
  }, [started]);

  // Simulate progress
  const simulateProgress = async (steps = 4) => {
    const increment = 100 / steps;
    for (let i = 1; i <= steps; i++) {
      await new Promise(r => setTimeout(r, 400));
      setProgress(i * increment);
    }
  };

  // Single URL check
  const handleCheck = async (url) => {
    setResult(null);
    setLoading(true);
    setProgress(0);

    await simulateProgress();

    const res = await checkUrl(url);
    setResult(res);
    setLoading(false);
    setProgress(100);
  };

  // Batch URL check
  const handleBatchCheck = async (urls) => {
    setBatchResults([]);
    setLoading(true);
    setProgress(0);

    await simulateProgress(urls.length);

    const res = await checkBatch(urls);
    setBatchResults(res);
    setLoading(false);
    setProgress(100);
  };

  // Handle starting the app from Home
  const handleStart = () => {
    setStarted(true);
  };

  // Wait until started is loaded from localStorage
  if (started === null) return null;

  // Show Home page if not started
  if (!started) {
    return <Home onStart={handleStart} />;
  }

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

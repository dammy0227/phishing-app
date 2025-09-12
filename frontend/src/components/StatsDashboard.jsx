import { useEffect, useState } from "react";
import { getStats, clearRecords } from "../services/api";

export default function StatsDashboard() {
  const [stats, setStats] = useState(null);

  const fetchStats = async () => {
    const data = await getStats();
    setStats(data);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleClear = async () => {
    if (!window.confirm("⚠️ This will erase all records. Proceed?")) return;
    await clearRecords();
    fetchStats(); // refresh after clearing
  };

  if (!stats) return <p>Loading stats...</p>;

  return (
    <div className="stats-dashboard">
      <h2>Statistics</h2>
      <p>Total URLs Checked: {stats.total}</p>
      <p>Phishing URLs: {stats.phishingCount}</p>
      <p>Legitimate URLs: {stats.legitimateCount}</p>
      <p>Average Confidence: {(stats.avgConfidence * 100).toFixed(2)}%</p>

      <button
        onClick={handleClear}
        style={{
          marginTop: "15px",
          background: "red",
          color: "white",
          padding: "10px",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        Clear All Records
      </button>
    </div>
  );
}

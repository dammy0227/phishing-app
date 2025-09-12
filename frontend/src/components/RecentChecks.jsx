import { useEffect, useState } from "react";
import { getRecent, clearRecords } from "../services/api";
import ResultCard from "./ResultCard";

export default function RecentChecks() {
  const [recent, setRecent] = useState([]);

  const fetchRecent = async () => {
    const data = await getRecent();
    setRecent(data);
  };

  useEffect(() => {
    fetchRecent();
  }, []);

  const handleClear = async () => {
    if (!window.confirm("⚠️ Are you sure you want to clear all records?")) return;
    await clearRecords();
    setRecent([]); // clear frontend list
  };

  return (
    <div className="recent-checks">
      <h2>Recent Checks</h2>
      {recent.length === 0 && <p>No recent records.</p>}
      {recent.map(r => <ResultCard key={r._id} result={r} />)}

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

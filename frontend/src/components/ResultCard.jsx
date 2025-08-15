import './ResultCard.css';

export default function ResultCard({ result }) {
  if (!result) return null;

  return (
    <div className={`result-card ${result.label === "phishing" ? "phishing" : ""}`}>
      <h3>{result.label?.toUpperCase()}</h3>
      <p>Confidence: {(result.confidence * 100).toFixed(2)}%</p>
    </div>
  );
}

export default function ResultCard({ result }) {
  if (!result) return null;

  // Break reason into array if multi-step
  const reasons = result.reason ? result.reason.split(";") : [];

  return (
    <div className={`result-card ${result.label === "phishing" ? "phishing" : "legitimate"}`} style={{
      border: `2px solid ${result.label === "phishing" ? "red" : "green"}`,
      padding: "15px",
      borderRadius: "8px",
      marginBottom: "10px",
      background: "#f9f9f9"
    }}>
      <h3 style={{ color: result.label === "phishing" ? "red" : "green" }}>
        {result.label?.toUpperCase()}
      </h3>
      <p><strong>Confidence:</strong> {(result.confidence * 100).toFixed(2)}%</p>
      <p><strong>URL:</strong> {result.url}</p>
      {reasons.length > 0 && (
        <div>
          <strong>Reason(s):</strong>
          <ul>
            {reasons.map((r, idx) => <li key={idx}>{r}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}

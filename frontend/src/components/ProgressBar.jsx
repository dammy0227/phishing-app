export default function ProgressBar({ progress }) {
  return (
    <div className="progress-bar-container" style={{ margin: "10px 0", width: "100%", background: "#eee", borderRadius: "5px" }}>
      <div
        className="progress-bar-fill"
        style={{
          width: `${progress}%`,
          height: "20px",
          background: "#6fc3ff",
          borderRadius: "5px",
          transition: "width 0.3s ease"
        }}
      ></div>
    </div>
  );
}

import { useState } from "react";

export default function BatchUpload({ onBatchCheck }) {
  const [urls, setUrls] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlArray = urls.split("\n").map(u => u.trim()).filter(u => u);
    if (urlArray.length) {
      onBatchCheck(urlArray);
      setUrls(""); // ✅ Clear textarea after submit
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        rows={5}
        placeholder="Enter one URL per line..."
        value={urls}
        onChange={(e) => setUrls(e.target.value)}
      />
      <button type="submit">Check Batch</button>
    </form>
  );
}

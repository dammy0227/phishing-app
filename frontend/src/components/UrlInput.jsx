import { useState } from "react";

export default function UrlInput({ onCheck }) {
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.trim()) {
      onCheck(url);
      setUrl(""); // ✅ clear input after submit
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter URL to check..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button type="submit">Check</button>
    </form>
  );
}

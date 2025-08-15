import { useState } from "react";
import './Url.css'

export default function UrlInput({ onCheck }) {
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.trim()) onCheck(url);
  };

  return (
    <form onSubmit={handleSubmit} >
      <input
        type="text"
        placeholder="Enter URL to check..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        
      />
      <button>
        Check
      </button>
    </form>
  );
}

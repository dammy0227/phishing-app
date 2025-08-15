import { useState } from "react";
import Home from "./components/Home";
import UrlInput from "./components/UrlInput";
import ResultCard from "./components/ResultCard";
import { checkUrl } from "./services/api";
import "./App.css";

export default function App() {
  const [page, setPage] = useState("home");
  const [result, setResult] = useState(null);

  const handleCheck = async (url) => {
    setResult(null);
    const res = await checkUrl(url);
    setResult(res);
  };

  if (page === "home") {
    return <Home onStart={() => setPage("checker")} />;
  }

  return (
    <div className="app-container">
      <div className="app-wrapper">
      <h1 className="app-header">Phishing URL Checker</h1>
      <UrlInput onCheck={handleCheck} />
      <ResultCard result={result} />
      </div>
    </div>
  );
}

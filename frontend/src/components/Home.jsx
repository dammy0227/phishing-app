import React from "react";
import { motion as Motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    // ✅ Just navigate—no localStorage needed
    navigate("/app");
  };

  return (
    <div className="home-container">
      <header className="hero">
        <Motion.div
          className="hero-icon"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 50 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="90"
            height="90"
            fill="white"
            viewBox="0 0 24 24"
          >
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zM12 3.09L18 6v5.91c0 4.36-3.03 8.49-6 9.79-2.97-1.3-6-5.43-6-9.79V6l6-2.91z" />
            <path d="M12 8a4 4 0 100 8 4 4 0 000-8zm0 2a2 2 0 110 4 2 2 0 010-4z" />
          </svg>
        </Motion.div>

        <h1>Phishing URL Detector</h1>
        <p>Protect yourself from scams with our AI-powered detection tool.</p>
        <button onClick={handleStart}>Get Started</button>
      </header>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step-card">
            <span>1️⃣</span>
            <p>Enter a suspicious URL</p>
          </div>
          <div className="step-card">
            <span>2️⃣</span>
            <p>AI scans it instantly</p>
          </div>
          <div className="step-card">
            <span>3️⃣</span>
            <p>Get phishing or safe result</p>
          </div>
        </div>
      </section>

      <footer>
        <p>
          © 2025 Your Name - Final Year Project <br />
          This tool is designed to help users identify phishing websites quickly and safely.
          <br /> Always be careful online and double-check URLs before entering sensitive
          information.
        </p>
      </footer>
    </div>
  );
};

export default Home;

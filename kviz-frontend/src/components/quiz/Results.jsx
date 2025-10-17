// src/components/Results.jsx
import React from "react";
import "../../styles/results.css";

function Results({ results, timeElapsed, onBack }) {
  const correctCount = results.filter(r => r.correct).length;

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  };

  return (
    <div className="results-container">
      <h2>Rezultati kviza</h2>
      <p>Ukupno tačnih odgovora: {correctCount} / {results.length}</p>
      <p>Vreme trajanja: {formatTime(timeElapsed)}</p>

      <ul className="results-list">
        {results.map((r, idx) => (
          <li key={idx} className={`result-item ${r.correct ? "correct" : "wrong"}`}>
            <strong>Pitanje:</strong> {r.question_text} <br/>
            <strong>Vaš odgovor:</strong> {r.selected_text || "Niste odgovorili"} <br/>
            <strong>Status:</strong> {r.correct ? "Tačno" : "Pogrešno"}

          </li>
        ))}
      </ul>

      <button className="back-btn" onClick={onBack}>← Nazad na predmete</button>
    </div>
  );
}

export default Results;

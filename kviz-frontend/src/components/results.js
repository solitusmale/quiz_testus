// src/components/Results.js
import React from "react";
import "../styles/results.css";

function Results({ subject, results, onBack }) {
  // results je niz objekata: { question_text, selected_answer, correct }
  const correctCount = results.filter(r => r.correct).length;

  return (
    <div className="results-container">
      <h2>Rezultati - {subject.name}</h2>
      <p>Tačni odgovori: {correctCount} / {results.length}</p>

      <ul className="results-list">
        {results.map((r, idx) => (
          <li key={idx} className={`result-card ${r.correct ? "correct" : "wrong"}`}>
            <p><strong>Pitanje:</strong> {r.question_text}</p>
            <p><strong>Vaš odgovor:</strong> {r.selected_answer}</p>
            <p><strong>Rezultat:</strong> {r.correct ? "Tačno ✅" : "Netačno ❌"}</p>
          </li>
        ))}
      </ul>

      <button className="back-btn" onClick={onBack}>← Nazad na predmete</button>
    </div>
  );
}

export default Results;

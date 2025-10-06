// src/components/Questions.js
import React, { useState, useEffect } from "react";
import "../styles/questions.css";

function Questions({ subject, token, onBack, onFinish }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0); // tajmer u sekundama

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(
          `http://localhost/kviz/api/get_questions.php?subject_id=${subject.subject_id}&token=${token}`
        );
        const data = await res.json();
        setQuestions(data.questions || []);
      } catch (err) {
        console.error("Greška pri učitavanju pitanja:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();

    // start tajmera
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer); // stop tajmera kad komponenta unmount
  }, [subject, token]);

  if (loading) return <p style={{ textAlign: "center" }}>Učitavanje pitanja...</p>;
  if (!questions.length) return <p style={{ textAlign: "center" }}>Nema pitanja za ovaj predmet</p>;

  const currentQuestion = questions[currentIndex];
  const userSelection = selectedAnswers[currentQuestion.question_id] || { answerIds: [] };

  const handleAnswerClick = (answer_id) => {
    if (showResult) return;

    // Single choice
    if (currentQuestion.question_type === "single") {
      setSelectedAnswers(prev => ({
        ...prev,
        [currentQuestion.question_id]: { answerIds: [answer_id] }
      }));
    } else {
      // Multiple choice
      setSelectedAnswers(prev => {
        const existing = prev[currentQuestion.question_id]?.answerIds || [];
        const updated = existing.includes(answer_id)
          ? existing.filter(id => id !== answer_id)
          : [...existing, answer_id];
        return {
          ...prev,
          [currentQuestion.question_id]: { answerIds: updated }
        };
      });
    }
  };

  const handleCheckNext = async () => {
    const answerIds = selectedAnswers[currentQuestion.question_id]?.answerIds || [];
    if (!answerIds.length) return alert("Odaberite bar jedan odgovor!");

    try {
      const res = await Promise.all(
        answerIds.map(id =>
          fetch(`http://localhost/kviz/api/check_answers.php?answer_id=${id}`).then(r => r.json())
        )
      );

      const correctAnswers = res
        .filter(r => r.correct)
        .map((_, i) => answerIds[i]);

      setSelectedAnswers(prev => ({
        ...prev,
        [currentQuestion.question_id]: {
          ...prev[currentQuestion.question_id],
          correctAnswers
        }
      }));

      setShowResult(true);
    } catch (err) {
      console.error(err);
    }
  };

const handleNextQuestion = () => {
  setShowResult(false);
  if (currentIndex + 1 < questions.length) {
    setCurrentIndex(currentIndex + 1);
  } else {
    // kraj kviza
    const results = questions.map(q => {
      const sel = selectedAnswers[q.question_id] || {};
      const selectedIds = sel.answerIds || [];
      const correctIds = sel.correctAnswers || [];

      const selectedText = q.answers
        .filter(a => selectedIds.includes(a.answer_id))
        .map(a => a.answer_text)
        .join(", ") || null;

      return {
        question_id: q.question_id,
        question_text: q.question_text,
        selected_answers: selectedIds,
        selected_text: selectedText,
        correct_answers: correctIds,
        correct: correctIds.length === selectedIds.length && correctIds.every(id => selectedIds.includes(id))
      };
    });
    onFinish(results, timeElapsed);
  }
};


  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2,'0')}`;
  };

  return (
    <div className="questions-container">
      <h2>{subject.name}</h2>
      <p className="timer">Vreme: {formatTime(timeElapsed)}</p>
      <button className="back-btn" onClick={onBack}>← Nazad</button>

      <div className="question-card">
        <p>{currentQuestion.question_text}</p>
        <ul className="answers-list">
          {currentQuestion.answers.map(a => {
            const selected = userSelection.answerIds.includes(a.answer_id);
            const correct = userSelection.correctAnswers?.includes(a.answer_id);
            return (
              <li
                key={a.answer_id}
                className={`answer-item ${showResult ? (correct ? "correct" : selected ? "wrong" : "") : ""}`}
                onClick={() => handleAnswerClick(a.answer_id)}
              >
                <input
                  type={currentQuestion.question_type === "multiple" ? "checkbox" : "radio"}
                  name={`question_${currentQuestion.question_id}`}
                  checked={selected}
                  readOnly
                />
                <span>{a.answer_text}</span>
              </li>
            );
          })}
        </ul>

        {!showResult ? (
          <button className="check-btn" onClick={handleCheckNext}>Proveri odgovor</button>
        ) : (
          <button className="next-btn" onClick={handleNextQuestion}>
            {currentIndex + 1 < questions.length ? "Sledeće pitanje" : "Završi kviz"}
          </button>
        )}
      </div>
    </div>
  );
}

export default Questions;

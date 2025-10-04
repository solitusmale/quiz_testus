// src/components/Questions.js
import React, { useState, useEffect } from "react";
import "../styles/questions.css";

function Questions({ subject, token, onBack, onFinish }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // čuva izabrane odgovore
  const [timeElapsed, setTimeElapsed] = useState(0); // u sekundama

  useEffect(() => {
    // učitavanje pitanja
    fetch(`http://localhost/kviz/api/get_questions.php?subject_id=${subject.subject_id}&token=${token}`)
      .then(res => res.json())
      .then(data => {
        setQuestions(data.questions || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });

    // start tajmera
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer); // stop tajmera kad komponenta unmount
  }, [subject, token]);

  const handleAnswerClick = async (question_id, answer_id) => {
    if (selectedAnswers[question_id]) return; // već je izabran

    try {
      const res = await fetch(`http://localhost/kviz/api/check_answers.php?answer_id=${answer_id}`);
      const data = await res.json();

      setSelectedAnswers(prev => ({
        ...prev,
        [question_id]: {
          answer_id,
          correct: data.correct,
          answer_text: data.answer_text
        }
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleFinishQuiz = () => {
    const results = questions.map(q => ({
      question_id: q.question_id,
      question_text: q.question_text,
      selected_answer: selectedAnswers[q.question_id]?.answer_text || null,
      correct: selectedAnswers[q.question_id]?.correct || false
    }));

    onFinish(results, timeElapsed); // prosleđujemo rezultate i trajanje
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  };

  if (loading) return <p style={{ textAlign: "center" }}>Učitavanje pitanja...</p>;

  const allAnswered = questions.length && Object.keys(selectedAnswers).length === questions.length;

  return (
    <div className="questions-container">
      <h2>{subject.name}</h2>
      <p className="timer">Vreme: {formatTime(timeElapsed)}</p>
      <button className="back-btn" onClick={onBack}>← Nazad</button>

      {!questions.length ? (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Nema dostupnih pitanja za ovaj predmet
        </p>
      ) : (
        <ul className="questions-list">
          {questions.map(q => (
            <li key={q.question_id} className="question-card">
              <p>{q.question_text}</p>
              <ul className="answers-list">
                {q.answers.map(a => {
                  const selected = selectedAnswers[q.question_id]?.answer_id === a.answer_id;
                  const correct = selectedAnswers[q.question_id]?.correct;

                  return (
                    <li
                      key={a.answer_id}
                      onClick={() => handleAnswerClick(q.question_id, a.answer_id)}
                      className={`answer-item ${selected ? (correct ? "correct" : "wrong") : ""}`}
                    >
                      {a.answer_text}
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>
      )}

      {allAnswered && (
        <button className="finish-btn" onClick={handleFinishQuiz}>
          Završi kviz
        </button>
      )}
    </div>
  );
}

export default Questions;

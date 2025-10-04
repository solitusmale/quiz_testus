import React, { useState, useEffect } from "react";
import "../styles/questions.css";

function Questions({ subject, token, onBack }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [answered, setAnswered] = useState({});
  const [score, setScore] = useState(0);

  useEffect(() => {
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
  }, [subject, token]);

  const handleAnswerClick = (qId, aId) => {
    if (answered[qId]) return; // već odgovoreno

    fetch(`http://localhost/kviz/api/check_answer.php?answer_id=${aId}`)
      .then(res => res.json())
      .then(data => {
        setAnswered(prev => ({
          ...prev,
          [qId]: { selected: aId, correct: data.correct, explanation: data.explanation }
        }));
        if (data.correct) {
          setScore(prev => prev + 1);
        }
      })
      .catch(err => console.error(err));
  };

  if (loading) return <p style={{ textAlign: "center" }}>Učitavanje pitanja...</p>;

  const isFinished = questions.length > 0 && Object.keys(answered).length === questions.length;

  return (
    <div className="questions-container">
      <h2>{subject.name}</h2>
      <button className="back-btn" onClick={onBack}>← Nazad</button>

      {/* Ako je kviz završen, prikaži rezultat */}
      {isFinished ? (
        <div className="quiz-result">
          <h3>Kviz završen!</h3>
          <p>Vaš rezultat: {score} / {questions.length}</p>
          <button className="retry-btn" onClick={onBack}>
            ↩ Nazad na predmete
          </button>
        </div>
      ) : (
        <>
          <div className="score-box">
            Tačnih odgovora: {score} / {questions.length}
          </div>

          {!questions.length ? (
            <p style={{ textAlign: "center", marginTop: "20px" }}>
              Nema dostupnih pitanja za ovaj predmet
            </p>
          ) : (
            <ul className="questions-list">
              {questions.map(q => (
                <li key={q.question_id} className="question-card">
                  <p>{q.question_text}</p>
                  <ul>
                    {q.answers.map(a => {
                      const ansState = answered[q.question_id];
                      let className = "";
                      if (ansState?.selected === a.answer_id) {
                        className = ansState.correct ? "correct" : "wrong";
                      }
                      return (
                        <li
                          key={a.answer_id}
                          className={className}
                          onClick={() => handleAnswerClick(q.question_id, a.answer_id)}
                          style={{ cursor: ansState ? "default" : "pointer" }}
                        >
                          {a.answer_text}
                        </li>
                      );
                    })}
                  </ul>
                  {answered[q.question_id]?.explanation && (
                    <p className="explanation">
                      💡 {answered[q.question_id].explanation}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}

export default Questions;

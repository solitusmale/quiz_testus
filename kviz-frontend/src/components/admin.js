// src/components/admin.js
import React, { useState, useEffect } from "react";
import "../styles/admin.css";

function Admin({ token, onBack }) {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [questionText, setQuestionText] = useState("");
  const [answers, setAnswers] = useState([{ text: "", correct: false }]);
  const [questionType, setQuestionType] = useState("single"); // single ili multiple
  const [message, setMessage] = useState("");

  // Učitaj predmete
  useEffect(() => {
    if (!token) return;

    fetch("http://localhost/kviz/api/get_subjects.php", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setSubjects(data.subjects || data))
      .catch((err) => console.error("Greška pri učitavanju predmeta:", err));
  }, [token]);

  const addAnswerField = () =>
    setAnswers([...answers, { text: "", correct: false }]);
  const removeAnswerField = (index) =>
    setAnswers(answers.filter((_, i) => i !== index));

  const handleAnswerChange = (index, field, value) => {
    const updated = [...answers];
    updated[index][field] = value;
    setAnswers(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSubject) return setMessage("Izaberite predmet");
    if (!token) return setMessage("Nema validnog tokena");

    try {
      const res = await fetch(
        "http://localhost/kviz/api/admin_add_question.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            subject_id: selectedSubject.subject_id,
            question_text: questionText,
            question_type: questionType,
            answers,
          }),
        }
      );

      // Ako status nije 2xx → baca grešku
      if (!res.ok) {
        const text = await res.text(); // čita HTML/tekstualni odgovor
        throw new Error(`HTTP ${res.status}: ${text}`);
      }

      const data = await res.json();
      setMessage(data.message || "Nešto je pošlo po zlu");

      if (data.success) {
        setQuestionText("");
        setAnswers([{ text: "", correct: false }]);
        setQuestionType("single");
      }
    } catch (err) {
      console.error("Greška pri slanju pitanja:", err);
      setMessage("Greška pri slanju pitanja: " + err.message);
    }
  };

  return (
    <div className="admin-container">
      <button className="back-btn" onClick={onBack}>
        ← Nazad
      </button>
      <h2>Admin Panel - Dodavanje pitanja</h2>

      <div className="form-group">
        <label>Izaberite predmet:</label>
        <select
          value={selectedSubject?.subject_id || ""}
          onChange={(e) => {
            const id = parseInt(e.target.value);
            setSelectedSubject(subjects.find((s) => s.subject_id === id));
          }}
        >
          <option value="">-- Odaberite predmet --</option>
          {subjects.map((s) => (
            <option key={s.subject_id} value={s.subject_id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Tip pitanja:</label>
        <label>
          <input
            type="radio"
            name="questionType"
            value="single"
            checked={questionType === "single"}
            onChange={(e) => setQuestionType(e.target.value)}
          />{" "}
          Single Choice
        </label>
        <label>
          <input
            type="radio"
            name="questionType"
            value="multiple"
            checked={questionType === "multiple"}
            onChange={(e) => setQuestionType(e.target.value)}
          />{" "}
          Multiple Choice
        </label>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <textarea
            placeholder="Tekst pitanja"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            required
          />
        </div>

        {answers.map((a, index) => (
          <div key={index} className="form-group answer-group">
            <input
              type="text"
              placeholder={`Odgovor ${index + 1}`}
              value={a.text}
              onChange={(e) => handleAnswerChange(index, "text", e.target.value)}
              required
            />
            <label>
              <input
                type="checkbox"
                checked={a.correct}
                onChange={(e) =>
                  handleAnswerChange(index, "correct", e.target.checked)
                }
              />{" "}
              Tačno
            </label>
            {answers.length > 1 && (
              <button
                type="button"
                className="remove-btn"
                onClick={() => removeAnswerField(index)}
              >
                Obriši
              </button>
            )}
          </div>
        ))}

        <div className="form-actions">
          <button type="button" className="add-btn" onClick={addAnswerField}>
            Dodaj odgovor
          </button>
          <button type="submit" className="save-btn">
            Sačuvaj pitanje
          </button>
        </div>
      </form>

      {message && (
        <p className={message.includes("uspešno") ? "success-msg" : "error-msg"}>
          {message}
        </p>
      )}
    </div>
  );
}

export default Admin;

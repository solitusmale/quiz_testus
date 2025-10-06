// Uvoz hook-ova iz React-a i CSS fajla
import React, { useState, useEffect } from "react";
import "../styles/admin.css";

function Admin({ token, onBack }) {
  // State promenljive:
  const [subjects, setSubjects] = useState([]); 
  // lista svih predmeta (učitava se sa servera)
  const [selectedSubject, setSelectedSubject] = useState(null); 
  // predmet koji je trenutno izabran
  const [questionText, setQuestionText] = useState(""); 
  // tekst pitanja koje admin unosi
  const [answers, setAnswers] = useState([{ text: "", correct: false }]); 
  // lista odgovora na pitanje (svaki odgovor je objekat {text, correct})
  const [questionType, setQuestionType] = useState("single"); 
  // tip pitanja → "single" (jedan tačan) ili "multiple" (više tačnih)
  const [message, setMessage] = useState(""); 
  // poruka za uspeh/grešku

  // useEffect → poziva se kada se komponenta učita ili se token promeni
  useEffect(() => {
    if (!token) return;

    // Fetch predmeta sa servera
    fetch("http://localhost/kviz/api/get_subjects.php", {
      headers: { Authorization: `Bearer ${token}` }, // prosleđujemo token kao header
    })
      .then((res) => res.json()) // parsiramo JSON
      .then((data) => setSubjects(data.subjects || data)) // snimamo predmete u state
      .catch((err) => console.error("Greška pri učitavanju predmeta:", err));
  }, [token]);

  // Dodavanje novog polja za odgovor
  const addAnswerField = () =>
    setAnswers([...answers, { text: "", correct: false }]);

  // Brisanje određenog odgovora
  const removeAnswerField = (index) =>
    setAnswers(answers.filter((_, i) => i !== index));

  // Izmena teksta ili statusa "correct" za neki odgovor
  const handleAnswerChange = (index, field, value) => {
    const updated = [...answers]; // kopiramo postojeće odgovore
    updated[index][field] = value; // menjamo odgovarajuće polje
    setAnswers(updated); // snimamo novi niz u state
  };

  // Slanje pitanja na server
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
            Authorization: `Bearer ${token}`, // opet token za autorizaciju
          },
          body: JSON.stringify({
            subject_id: selectedSubject.subject_id, // ID predmeta
            question_text: questionText, // tekst pitanja
            question_type: questionType, // tip pitanja (single/multiple)
            answers, // lista odgovora
          }),
        }
      );

      // Ako odgovor servera NIJE OK (npr. 500 error)
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`HTTP ${res.status}: ${text}`);
      }

      // Ako je sve OK, parsiramo JSON
      const data = await res.json();
      setMessage(data.message || "Nešto je pošlo po zlu");

      // Ako je success → reset forme
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
      {/* Dugme za povratak na Subjects */}
      <button className="back-btn" onClick={onBack}>
        ← Nazad
      </button>
      <h2>Admin Panel - Dodavanje pitanja</h2>

      {/* Padajući meni za izbor predmeta */}
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

      {/* Tip pitanja: Single ili Multiple Choice */}
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

      {/* Forma za unos pitanja i odgovora */}
      <form onSubmit={handleSubmit}>
        {/* Tekst pitanja */}
        <div className="form-group">
          <textarea
            placeholder="Tekst pitanja"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            required
          />
        </div>

        {/* Dinamička lista odgovora */}
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
            {/* Dugme za brisanje odgovora (ako ima više od jednog) */}
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

        {/* Dugmad: dodaj odgovor i sačuvaj pitanje */}
        <div className="form-actions">
          <button type="button" className="add-btn" onClick={addAnswerField}>
            Dodaj odgovor
          </button>
          <button type="submit" className="save-btn">
            Sačuvaj pitanje
          </button>
        </div>
      </form>

      {/* Poruka o uspehu/grešci */}
      {message && (
        <p className={message.includes("uspešno") ? "success-msg" : "error-msg"}>
          {message}
        </p>
      )}
    </div>
  );
}

export default Admin;

// src/components/Admin.js
import React, { useState, useEffect } from "react";
import "../styles/admin.css";

function Admin({ token, onBack }) {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);

  const [questionText, setQuestionText] = useState("");
  const [answers, setAnswers] = useState([{ text: "", correct: false }]);
  const [questionType, setQuestionType] = useState("single");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);

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

  // Učitaj pitanja
  const loadQuestions = (subjectId) => {
    fetch(`http://localhost/kviz/api/get_questions.php?subject_id=${subjectId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setQuestions(data.questions || []))
      .catch((err) => console.error("Greška pri učitavanju pitanja:", err));
  };

  // Dodavanje odgovora
  const addAnswerField = () => setAnswers([...answers, { text: "", correct: false }]);
  const removeAnswerField = (index) => setAnswers(answers.filter((_, i) => i !== index));
  const handleAnswerChange = (index, field, value) => {
    const updated = [...answers];
    updated[index][field] = value;
    setAnswers(updated);
  };

  // Submit dodavanja pitanja
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!selectedSubject) return setMessage("Izaberite predmet");

  try {
    const formData = new FormData();
    formData.append("subject_id", selectedSubject.subject_id);
    formData.append("question_text", questionText);
    formData.append("question_type", questionType);
    formData.append("answers", JSON.stringify(answers));
    if (image) formData.append("image", image);

    const res = await fetch("http://localhost/kviz/api/admin_add_question.php", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` }, // bez Content-Type, browser sam setuje
      body: formData,
    });

    const data = await res.json();
    setMessage(data.message || "Nešto je pošlo po zlu");
    if (data.success) {
      setQuestionText("");
      setAnswers([{ text: "", correct: false }]);
      setQuestionType("single");
      setImage(null);
      loadQuestions(selectedSubject.subject_id);
      setShowAddForm(false);
    }
  } catch (err) {
    console.error(err);
    setMessage("Greška: " + err.message);
  }
};

  // Delete pitanje
  const handleDelete = async (questionId) => {
    if (!window.confirm("Da li ste sigurni da želite da obrišete pitanje?")) return;
    try {
      const res = await fetch("http://localhost/kviz/api/admin_delete_question.php", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ question_id: questionId }),
      });
      const data = await res.json();
      setMessage(data.message);
      if (data.success) loadQuestions(selectedSubject.subject_id);
    } catch (err) {
      console.error(err);
    }
  };

  // Edit funkcije
  const handleEditAnswerChange = (index, field, value) => {
    const updated = [...editingQuestion.answers];
    updated[index][field] = value;
    setEditingQuestion({ ...editingQuestion, answers: updated });
  };
  const addEditAnswerField = () => {
    setEditingQuestion({
      ...editingQuestion,
      answers: [...editingQuestion.answers, { text: "", correct: false }],
    });
  };
  const removeEditAnswerField = (index) => {
    setEditingQuestion({
      ...editingQuestion,
      answers: editingQuestion.answers.filter((_, i) => i !== index),
    });
  };
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost/kviz/api/admin_edit_question.php", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(editingQuestion),
      });
      const data = await res.json();
      setMessage(data.message);
      if (data.success) {
        loadQuestions(selectedSubject.subject_id);
        setEditingQuestion(null);
      }
    } catch (err) {
      console.error(err);
      setMessage("Greška: " + err.message);
    }
  };

  return (
    <div className="admin-container">
      <button className="back-btn" onClick={onBack}>← Nazad</button>
      <h2>Admin Panel</h2>

      {/* Predmet */}
      <div className="form-group">
        <label>Izaberite predmet:</label>
        <select
          value={selectedSubject?.subject_id || ""}
          onChange={(e) => {
            const id = parseInt(e.target.value);
            const subj = subjects.find((s) => s.subject_id === id);
            setSelectedSubject(subj);
            if (subj) loadQuestions(subj.subject_id);
          }}
        >
          <option value="">-- Odaberite predmet --</option>
          {subjects.map((s) => <option key={s.subject_id} value={s.subject_id}>{s.name}</option>)}
        </select>
      </div>

      {/* Dugme Dodaj pitanje */}
      <button className="add-question-btn" onClick={() => setShowAddForm(!showAddForm)}>
        {showAddForm ? "Zatvori formu" : "➕ Dodaj pitanje"}
      </button>

      {/* Dodavanje pitanja */}
      {showAddForm && (
        <form onSubmit={handleSubmit} className="add-question-form">
          <textarea placeholder="Tekst pitanja" value={questionText} onChange={e => setQuestionText(e.target.value)} required/>
          <div className="form-group">
            <label>Tip pitanja:</label>
            <label><input type="radio" name="questionType" value="single" checked={questionType==="single"} onChange={e=>setQuestionType(e.target.value)}/> Single Choice</label>
            <label><input type="radio" name="questionType" value="multiple" checked={questionType==="multiple"} onChange={e=>setQuestionType(e.target.value)}/> Multiple Choice</label>
          </div>
          {answers.map((a,i)=>(
            <div key={i} className="form-group answer-group">
              <input type="text" value={a.text} onChange={e=>handleAnswerChange(i,"text",e.target.value)} required/>
              <label><input type="checkbox" checked={a.correct} onChange={e=>handleAnswerChange(i,"correct",e.target.checked)}/> Tačno</label>
              {answers.length>1 && <button type="button" className="remove-btn" onClick={()=>removeAnswerField(i)}>Obriši</button>}
            </div>
          ))}
          <div className="form-actions">
            <button type="button" className="add-btn" onClick={addAnswerField}>➕ Dodaj odgovor</button>
            <button type="submit" className="save-btn">💾 Sačuvaj pitanje</button>
          </div>
          <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])}/>

        </form>
      )}

      {/* Lista pitanja */}
      <div className="questions-list">
        <h3>Pitanja za predmet:</h3>
        {questions.length===0 ? <p>Nema pitanja za ovaj predmet.</p> :
          <ul>
            {questions.map(q=>(
              <li key={q.question_id}>
                <strong>{q.question_text}</strong> ({q.question_type})
                <button
                className="edit-btn"
                onClick={() => {
                    // Mapiraj odgovore iz baze u {text, correct} format koji forma očekuje
                    const answersFormatted = (q.answers || []).map(a => ({
                    text: a.answer_text,             // iz baze dolazi kao answer_text
                    correct: a.is_correct === 1 || a.is_correct === true // bool
                    }));

                    // Setuj editingQuestion sa normalizovanim odgovorima
                    setEditingQuestion({
                    ...q,
                    answers: answersFormatted
                    });
                }}
                >
                ✏ Izmeni
                </button>

                <button className="delete-btn" onClick={()=>handleDelete(q.question_id)}>🗑 Obriši</button>
              </li>
            ))}
          </ul>
        }
      </div>

      {/* Modal edit forme */}
            {editingQuestion && (
            <div className="modal-overlay">
                <div className="modal">
                <h3>Izmeni pitanje</h3>
                <form onSubmit={handleEditSubmit} encType="multipart/form-data">
                    <textarea
                    value={editingQuestion.question_text}
                    onChange={e => setEditingQuestion({ ...editingQuestion, question_text: e.target.value })}
                    required
                    />

                    <div className="form-group">
                    <label>Tip pitanja:</label>
                    <label>
                        <input
                        type="radio"
                        name="editQuestionType"
                        value="single"
                        checked={editingQuestion.question_type === "single"}
                        onChange={e => setEditingQuestion({ ...editingQuestion, question_type: e.target.value })}
                        /> Single Choice
                    </label>
                    <label>
                        <input
                        type="radio"
                        name="editQuestionType"
                        value="multiple"
                        checked={editingQuestion.question_type === "multiple"}
                        onChange={e => setEditingQuestion({ ...editingQuestion, question_type: e.target.value })}
                        /> Multiple Choice
                    </label>
                    </div>

                    {/* Odgovori */}
                    {editingQuestion.answers.map((a, i) => (
                    <div key={i} className="form-group answer-group">
                        <input
                        type="text"
                        value={a.text}
                        onChange={e => handleEditAnswerChange(i, "text", e.target.value)}
                        required
                        />
                        <label>
                        <input
                            type="checkbox"
                            checked={a.correct}
                            onChange={e => handleEditAnswerChange(i, "correct", e.target.checked)}
                        /> Tačno
                        </label>
                        {editingQuestion.answers.length > 1 && (
                        <button type="button" className="remove-btn" onClick={() => removeEditAnswerField(i)}>Obriši</button>
                        )}
                    </div>
                    ))}

                    <div className="form-actions">
                    <button type="button" className="add-btn" onClick={addEditAnswerField}>➕ Dodaj odgovor</button>
                    </div>

                    {/* Slika */}
                    <div className="form-group">
                    {editingQuestion.image_url && (
                        <div>
                        <p>Trenutna slika:</p>
                        <img src={`http://localhost/kviz/${editingQuestion.image_url}`} alt="Pitanje" style={{ maxWidth: "200px" }} />
                        </div>
                    )}
                    <label>Izmeni/dodaj sliku:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={e => setEditingQuestion({ ...editingQuestion, newImage: e.target.files[0] })}
                    />
                    </div>

                    <div className="form-actions">
                    <button type="submit" className="save-btn">💾 Sačuvaj izmene</button>
                    <button type="button" className="cancel-btn" onClick={() => setEditingQuestion(null)}>✖ Otkaži</button>
                    </div>
                </form>
                </div>
            </div>
            )}

      {message && <p className={message.includes("uspešno")?"success-msg":"error-msg"}>{message}</p>}
    </div>
  );
}

export default Admin;

// src/components/admin/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import "../../styles/admin.css";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";
import QuestionEditModal from "./QuestionEditModal";

function AdminDashboard({ token, onBack }) {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [message, setMessage] = useState("");

  // Učitavanje predmeta
  useEffect(() => {
    if (!token) return;

    const fetchSubjects = async () => {
      try {
        const res = await fetch("http://localhost/kviz/api/get_subjects.php", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setSubjects(data.subjects || data || []);
      } catch (err) {
        console.error("Greška pri učitavanju predmeta:", err);
        setMessage("Greška pri učitavanju predmeta.");
      }
    };

    fetchSubjects();
  }, [token]);

  // Učitavanje pitanja za odabrani predmet
  const loadQuestions = async (subjectId) => {
    if (!token || !subjectId) return;

    try {
      const res = await fetch(
        `http://localhost/kviz/api/get_questions.php?subject_id=${subjectId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      setQuestions(data.questions || []);
    } catch (err) {
      console.error("Greška pri učitavanju pitanja:", err);
      setMessage("Greška pri učitavanju pitanja.");
    }
  };

  // Brisanje pitanja
  const handleDelete = async (questionId) => {
    if (!window.confirm("Da li ste sigurni da želite da obrišete pitanje?")) return;

    try {
      const res = await fetch("http://localhost/kviz/api/admin_delete_question.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ question_id: questionId }),
      });
      const data = await res.json();
      setMessage(data.message || "");

      if (data.success && selectedSubject) {
        loadQuestions(selectedSubject.subject_id);
      }
    } catch (err) {
      console.error(err);
      setMessage("Greška pri brisanju pitanja.");
    }
  };

  const handleSubjectChange = (e) => {
    const id = parseInt(e.target.value);
    const subj = subjects.find((s) => s.subject_id === id) || null;
    setSelectedSubject(subj);

    if (subj) {
      loadQuestions(subj.subject_id);
    } else {
      setQuestions([]); // očisti listu pitanja kad se deselectuje predmet
    }
    setShowAddForm(false);
    setEditingQuestion(null);
    setMessage("");
  };

  return (
    <div className="admin-container">
      <button className="back-btn" onClick={onBack}>← Nazad</button>
      <h2>Admin Panel</h2>

      {/* Izbor predmeta */}
      <div className="form-group">
        <label>Izaberite predmet:</label>
        <select value={selectedSubject?.subject_id || ""} onChange={handleSubjectChange}>
          <option value="">-- Odaberite predmet --</option>
          {subjects.map((s) => (
            <option key={s.subject_id} value={s.subject_id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {/* Dodavanje pitanja */}
      {selectedSubject && (
        <>
          <button className="add-question-btn" onClick={() => setShowAddForm(!showAddForm)}>
            {showAddForm ? "Zatvori formu" : "➕ Dodaj pitanje"}
          </button>

          {showAddForm && (
            <QuestionForm
              token={token}
              selectedSubject={selectedSubject}
              onSuccess={() => {
                loadQuestions(selectedSubject.subject_id);
                setShowAddForm(false);
              }}
              setMessage={setMessage}
            />
          )}

          {/* Lista pitanja */}
          <QuestionList
            questions={questions}
            onEdit={setEditingQuestion}
            onDelete={handleDelete}
          />

          {/* Modal za izmenu */}
          {editingQuestion && (
            <QuestionEditModal
              token={token}
              question={editingQuestion}
              onClose={() => setEditingQuestion(null)}
              onSave={() => {
                loadQuestions(selectedSubject.subject_id);
                setEditingQuestion(null);
              }}
              setMessage={setMessage}
            />
          )}
        </>
      )}

      {message && (
        <p className={message.includes("uspešno") ? "success-msg" : "error-msg"}>
          {message}
        </p>
      )}
    </div>
  );
}

export default AdminDashboard;

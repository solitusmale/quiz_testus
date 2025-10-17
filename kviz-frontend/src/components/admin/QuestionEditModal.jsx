import React, { useState, useEffect } from "react";

const QuestionEditModal = ({ token, question, onClose, onSave, setMessage }) => {
  const [editing, setEditing] = useState(question);

  useEffect(() => setEditing(question), [question]);

  const handleAnswerChange = (i, field, value) => {
    const updated = [...editing.answers];
    updated[i][field] = value;
    setEditing({ ...editing, answers: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost/kviz/api/admin_edit_question.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editing),
      });
      const data = await res.json();
      setMessage(data.message);
      if (data.success) onSave();
    } catch (err) {
      console.error(err);
      setMessage("Greška: " + err.message);
    }
  };

  if (!editing) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Izmeni pitanje</h3>
        <form onSubmit={handleSubmit}>
          <textarea
            value={editing.question_text}
            onChange={(e) => setEditing({ ...editing, question_text: e.target.value })}
            required
          />

          {editing.answers.map((a, i) => (
            <div key={i} className="form-group answer-group">
              <input
                type="text"
                value={a.text}
                onChange={(e) => handleAnswerChange(i, "text", e.target.value)}
                required
              />
              <label>
                <input
                  type="checkbox"
                  checked={a.correct}
                  onChange={(e) => handleAnswerChange(i, "correct", e.target.checked)}
                /> Tačno
              </label>
            </div>
          ))}

          {editing.image_url && (
            <img
              src={`http://localhost/kviz/${editing.image_url}`}
              alt="Pitanje"
              style={{ maxWidth: "200px", marginTop: "10px" }}
            />
          )}

          <div className="modal-buttons">
            <button type="submit" className="save-btn">💾 Sačuvaj</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Otkaži</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuestionEditModal;

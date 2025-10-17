import React, { useState } from "react";

const QuestionForm = ({ token, selectedSubject, onSuccess, setMessage }) => {
  const [questionText, setQuestionText] = useState("");
  const [answers, setAnswers] = useState([{ text: "", correct: false }]);
  const [questionType, setQuestionType] = useState("single");
  const [image, setImage] = useState(null);

  const addAnswerField = () => setAnswers([...answers, { text: "", correct: false }]);
  const removeAnswerField = (index) => setAnswers(answers.filter((_, i) => i !== index));
  const handleAnswerChange = (index, field, value) => {
    const updated = [...answers];
    updated[index][field] = value;
    setAnswers(updated);
  };

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
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      setMessage(data.message);
      if (data.success) {
        setQuestionText("");
        setAnswers([{ text: "", correct: false }]);
        setQuestionType("single");
        setImage(null);
        onSuccess();
      }
    } catch (err) {
      console.error(err);
      setMessage("Greška: " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-question-form">
      <textarea
        placeholder="Tekst pitanja"
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
        required
      />

      <div className="form-group">
        <label>Tip pitanja:</label>
        <label>
          <input type="radio" name="questionType" value="single"
            checked={questionType === "single"}
            onChange={(e) => setQuestionType(e.target.value)} /> Single
        </label>
        <label>
          <input type="radio" name="questionType" value="multiple"
            checked={questionType === "multiple"}
            onChange={(e) => setQuestionType(e.target.value)} /> Multiple
        </label>
      </div>

      {answers.map((a, i) => (
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
          {answers.length > 1 && (
            <button type="button" onClick={() => removeAnswerField(i)} className="remove-btn">
              Obriši
            </button>
          )}
        </div>
      ))}

      <div className="form-actions">
        <button type="button" onClick={addAnswerField} className="add-btn">➕ Dodaj odgovor</button>
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
        <button type="submit" className="save-btn">💾 Sačuvaj pitanje</button>
      </div>
    </form>
  );
};

export default QuestionForm;

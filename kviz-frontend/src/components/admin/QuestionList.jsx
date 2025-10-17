import React from "react";

const QuestionList = ({ questions, onEdit, onDelete }) => {
  return (
    <div className="questions-list">
      <h3>Pitanja</h3>
      {questions.length === 0 ? (
        <p>Nema pitanja za ovaj predmet.</p>
      ) : (
        <ul>
          {questions.map((q) => (
            <li key={q.question_id}>
              <strong>{q.question_text}</strong> ({q.question_type})
              <div className="question-actions">
                <button
                  className="edit-btn"
                  onClick={() =>
                    onEdit({
                      ...q,
                      answers: (q.answers || []).map((a) => ({
                        text: a.answer_text,
                        correct: a.is_correct === 1 || a.is_correct === true,
                      })),
                    })
                  }
                >
                  ✏ Izmeni
                </button>
                <button className="delete-btn" onClick={() => onDelete(q.question_id)}>
                  🗑 Obriši
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuestionList;

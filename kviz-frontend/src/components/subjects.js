import React, { useState, useEffect } from "react";
import "../styles/subjects.css";

function Subjects({ token, onSelect }) { // primamo onSelect iz App.js
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost/kviz/api/get_subjects.php", {
      headers: { "Authorization": token || "" }
    })
      .then(res => res.json())
      .then(data => {
        setSubjects(data.subjects || data); // fallback ako JSON vraća niz direktno
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [token]);

  if (loading) return <p style={{textAlign:'center'}}>Učitavanje predmeta...</p>;
  if (!subjects.length) return <p style={{textAlign:'center'}}>Nema dostupnih predmeta</p>;

  return (
    <div className="subjects-container">
      <h2>Izaberite predmet</h2>
      <ul className="subjects-list">
        {subjects.map(s => (
          <li key={s.subject_id} className="subject-card">
            {/* Umesto alert, pozivamo onSelect */}
            <button onClick={() => onSelect(s)}>
              {s.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Subjects;

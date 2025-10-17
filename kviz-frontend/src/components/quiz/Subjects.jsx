import React, { useState, useEffect } from "react";
import "../../styles/subjects.css";

function Subjects({ token, onSelect, userRole, onShowAdmin }) {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubjects = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("http://localhost/kviz/api/get_subjects.php", {
          headers: { "Authorization": token || "" }
        });

        if (!res.ok) {
          throw new Error(`Server returned HTTP ${res.status}`);
        }

        const data = await res.json();
        if (!data || !Array.isArray(data)) {
          throw new Error("Neočekivan ili prazan odgovor od servera");
        }

        setSubjects(data);
      } catch (err) {
        console.error("Greška pri učitavanju predmeta:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, [token]);

  if (loading) return <p style={{ textAlign: "center" }}>Učitavanje predmeta...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;
  if (!subjects.length) return <p style={{ textAlign: "center" }}>Nema dostupnih predmeta</p>;

  return (
    <div className="subjects-container">
      {userRole === "admin" && (
        <div className="admin-link">
          <button onClick={onShowAdmin} className="link-btn">
            Admin panel
          </button>
        </div>
      )}

      <h2>Izaberite predmet</h2>
      <ul className="subjects-list">
        {subjects.map((s) => (
          <li key={s.subject_id} className="subject-card">
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

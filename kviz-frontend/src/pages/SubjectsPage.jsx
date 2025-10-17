import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/subjects.css";

function SubjectsPage({ token, userRole }) {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubjects = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost/kviz/api/get_subjects.php", {
          headers: { "Authorization": token }
        });
        const data = await res.json();
        setSubjects(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSubjects();
  }, [token]);

  if (loading) return <p style={{ textAlign: "center" }}>Učitavanje predmeta...</p>;

  return (
    <div className="subjects-container">
      {userRole === "admin" && (
        <button onClick={() => navigate("/admin")}>Admin panel</button>
      )}
      <h2>Izaberite predmet</h2>
      <ul className="subjects-list">
        {subjects.map((s) => (
          <li key={s.subject_id}>
            <button onClick={() => navigate(`/questions/${s.subject_id}`)}>{s.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SubjectsPage;

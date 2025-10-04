import React, { useState } from "react";
import Register from "./components/register";
import Login from "./components/login";
import Subjects from "./components/subjects";
import Questions from "./components/questions";
import Results from "./components/results"; // nova komponenta za rezultate
import "./styles/app.css";

function App() {
  const [showRegister, setShowRegister] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [quizResults, setQuizResults] = useState(null); // čuvamo rezultate kviza

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };

  const handleSelectSubject = (subject) => {
    setSelectedSubject(subject);
    setQuizResults(null); // resetujemo rezultate kad se bira novi predmet
  };

  const handleBackToSubjects = () => {
    setSelectedSubject(null);
  };

  const handleFinishQuiz = (results) => {
    setQuizResults(results);
  };

  if (!user) {
    return (
      <div className="app-container">
        {!showRegister ? (
          <div>
            <Login onLogin={handleLogin} />
            <div className="switch-link">
              <button onClick={() => setShowRegister(true)} className="link-btn">
                Nemate nalog? Registrujte se
              </button>
            </div>
          </div>
        ) : (
          <div>
            <Register />
            <div className="switch-link">
              <button onClick={() => setShowRegister(false)} className="link-btn">
                Već imate nalog? Prijavite se
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Ako je korisnik ulogovan
  if (selectedSubject && quizResults) {
    // prikaži Results stranicu
    return (
      <Results
        subject={selectedSubject}
        results={quizResults}
        onBack={handleBackToSubjects}
      />
    );
  }

  return (
    <div className="app-container">
      {!selectedSubject ? (
        <Subjects token={user.api_token} onSelect={handleSelectSubject} />
      ) : (
        <Questions
          subject={selectedSubject}
          token={user.api_token}
          onBack={handleBackToSubjects}
          onFinish={handleFinishQuiz} // prosleđujemo prop
        />
      )}
    </div>
  );
}

export default App;

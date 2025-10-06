import React, { useState } from "react";
import Login from "./components/login";
import Subjects from "./components/subjects";
import Questions from "./components/questions";
import Results from "./components/results";
import Admin from "./components/admin";
import "./styles/app.css";

function App() {
  const [user, setUser] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [quizResults, setQuizResults] = useState(null);
  const [quizTime, setQuizTime] = useState(0);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  // Callback nakon uspešnog logina ili registracije
  const handleLogin = (loggedInUser) => setUser(loggedInUser);

  const handleSelectSubject = (subject) => setSelectedSubject(subject);

  const handleBackToSubjects = () => {
    setSelectedSubject(null);
    setQuizResults(null);
    setShowAdminPanel(false);
  };

  const handleFinishQuiz = (results, timeElapsed) => {
    setQuizResults(results);
    setQuizTime(timeElapsed);
  };

  // Ako korisnik nije ulogovan, prikazujemo Login sa opcijom registracije
  if (!user) {
    return (
      <div className="app-container">
        <Login onLogin={handleLogin} />
      </div>
    );
  }

  // Ako je korisnik ulogovan
  return (
    <div className="app-container">
      {!selectedSubject && !showAdminPanel ? (
        <Subjects
          token={user.api_token}
          onSelect={handleSelectSubject}
          userRole={user.role}
          onShowAdmin={() => setShowAdminPanel(true)}
        />
      ) : showAdminPanel ? (
        <Admin token={user.api_token} onBack={handleBackToSubjects} />
      ) : !quizResults ? (
        <Questions
          subject={selectedSubject}
          token={user.api_token}
          onBack={handleBackToSubjects}
          onFinish={handleFinishQuiz}
        />
      ) : (
        <Results
          results={quizResults}
          timeElapsed={quizTime}
          onBack={handleBackToSubjects}
        />
      )}
    </div>
  );
}

export default App;

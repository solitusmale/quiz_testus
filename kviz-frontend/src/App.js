// src/App.js
import React, { useState } from "react";
import LandingPage from "./components/landingpage";
import Login from "./components/login";
import Subjects from "./components/subjects";
import Questions from "./components/questions";
import Results from "./components/results";
import Admin from "./components/admin";
import Navbar from "./components/navbar"; // Dodali smo navbar

import "./styles/app.css";

function App() {
  const [user, setUser] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [quizResults, setQuizResults] = useState(null);
  const [quizTime, setQuizTime] = useState(0);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [page, setPage] = useState("landing"); // menja showLanding

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    setPage("subjects");
  };

  const handleLogout = () => {
    setUser(null);
    setPage("landing");
  };

  const handleSelectSubject = (subject) => setSelectedSubject(subject);

  const handleBackToSubjects = () => {
    setSelectedSubject(null);
    setQuizResults(null);
    setShowAdminPanel(false);
    setPage("subjects");
  };

  const handleFinishQuiz = (results, timeElapsed) => {
    setQuizResults(results);
    setQuizTime(timeElapsed);
  };

  return (
    <div className="app-container">
      {/* Navbar stalno vidljiv */}
      <Navbar user={user} onNavigate={setPage} onLogout={handleLogout} />

      {/* Rute logika */}
      {page === "landing" && (
        <LandingPage
          onLoginClick={() => setPage("login")}
          onBrowseClick={() => setPage("subjects")}
        />
      )}

      {page === "login" && !user && <Login onLogin={handleLogin} />}

      {page === "subjects" && user && !selectedSubject && !showAdminPanel && (
        <Subjects
          token={user.api_token}
          onSelect={handleSelectSubject}
          userRole={user.role}
          onShowAdmin={() => setShowAdminPanel(true)}
        />
      )}

      {showAdminPanel && page === "admin" && user?.role === "admin" && (
        <Admin token={user.api_token} onBack={handleBackToSubjects} />
      )}

      {selectedSubject && !quizResults && (
        <Questions
          subject={selectedSubject}
          token={user.api_token}
          onBack={handleBackToSubjects}
          onFinish={handleFinishQuiz}
        />
      )}

      {quizResults && (
        <Results
          results={quizResults}
          timeElapsed={quizTime}
          onBack={handleBackToSubjects}
        />
      )}

      {page === "tokens" && <div className="p-6">Ovde ide kupovina tokena 💰</div>}
      {page === "profile" && <div className="p-6">Korisnički profil</div>}
    </div>
  );
}

export default App;

// src/App.js
import React, { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "./styles/app.css";

// 🔹 Komponente
import Navbar from "./components/common/ui/Navbar.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SubjectsPage from "./pages/SubjectsPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import Questions from "./components/quiz/Questions.jsx";
import ResultsPage from "./pages/ResultsPage.jsx";





function App() {
  const [user, setUser] = useState(null);
  const [quizResults, setQuizResults] = useState(null);
  const [quizTime, setQuizTime] = useState(0);

  const navigate = useNavigate();

  // 🔹 Login / Logout
  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    navigate("/subjects");
  };

  const handleLogout = () => {
    setUser(null);
    setQuizResults(null);
    setQuizTime(0);
    navigate("/");
  };

  // 🔹 Povratak na listu predmeta
  const handleBackToSubjects = () => {
    setQuizResults(null);
    navigate("/subjects");
  };

  return (
    <div className="app-container">
      <Navbar user={user} onLogout={handleLogout} />

      <Routes>
        {/* 🏠 Početna */}
        <Route
          path="/"
          element={
            <HomePage
              onLoginClick={() => navigate("/login")}
              onBrowseClick={() => navigate("/subjects")}
            />
          }
        />

        {/* 🔑 Prijava */}
        <Route
          path="/login"
          element={<LoginPage onLogin={handleLogin} />}
        />

        {/* 📚 Predmeti */}
        <Route
          path="/subjects"
          element={
            user ? (
              <SubjectsPage
                token={user.api_token}
                userRole={user.role}
                onSelect={(subject) => navigate(`/questions/${subject.subject_id}`)}
                onShowAdmin={() => navigate("/admin")}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* 🧑‍💼 Admin panel */}
        <Route
          path="/admin"
          element={
            user?.role === "admin" ? (
              <AdminPage onBack={handleBackToSubjects} token={user.api_token} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* ❓ Pitanja */}
        <Route
          path="/questions/:subjectId"
          element={<Questions token={user?.api_token} />}
        />

        {/* 🧾 Rezultati */}
        <Route
          path="/results"
          element={
            quizResults ? (
              <ResultsPage
                results={quizResults}
                timeElapsed={quizTime}
                onBack={handleBackToSubjects}
              />
            ) : (
              <Navigate to="/subjects" />
            )
          }
        />

        {/* 🌐 Nepostojeća ruta */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}



export default App;

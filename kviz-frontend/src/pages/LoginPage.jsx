// src/pages/LoginPage.jsx
import React from "react";
import Navbar from "../components/common/ui/Navbar.jsx";
import Login from "../components/auth/login.jsx";

export default function LoginPage({ onLogin, onNavigate }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-100 via-white to-blue-100">
      {/* Gornja navigacija */}
      <Navbar onNavigate={onNavigate} />

      {/* Glavni sadržaj */}
      <div className="flex flex-1 justify-center items-center">
        <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Prijavi se na <span className="text-purple-600">QuizZone</span>
          </h1>
          <Login onLogin={onLogin} />
        </div>
      </div>
    </div>
  );
}

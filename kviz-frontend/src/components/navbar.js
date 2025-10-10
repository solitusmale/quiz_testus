// src/components/Navbar.js
import React, { useState } from "react";

export default function Navbar({ user, onNavigate, onLogout }) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="bg-purple-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div
          className="text-2xl font-bold cursor-pointer"
          onClick={() => onNavigate("home")}
        >
          QuizZone
        </div>

        {/* Linkovi */}
        <ul className="flex items-center gap-6">
          <li
            className="cursor-pointer hover:text-gray-200"
            onClick={() => onNavigate("home")}
          >
            Home
          </li>

          {/* Kvizovi sa padajućim menijem */}
          <li
            className="relative cursor-pointer hover:text-gray-200"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            Kvizovi ▾
            {showDropdown && (
              <ul className="absolute top-8 left-0 bg-white text-black rounded-md shadow-lg w-40">
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => onNavigate("math")}
                >
                  Matematika
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => onNavigate("history")}
                >
                  Istorija
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => onNavigate("science")}
                >
                  Nauka
                </li>
              </ul>
            )}
          </li>

          <li
            className="cursor-pointer hover:text-gray-200"
            onClick={() => onNavigate("tokens")}
          >
            Kupi tokene
          </li>

          {/* Admin deo */}
          {user?.role === "admin" && (
            <li
              className="cursor-pointer hover:text-gray-200"
              onClick={() => onNavigate("admin")}
            >
              Admin panel
            </li>
          )}

          {/* User deo */}
          {user && (
            <li
              className="cursor-pointer hover:text-gray-200"
              onClick={() => onNavigate("profile")}
            >
              Moj profil
            </li>
          )}

          {/* Login/Logout */}
          {user ? (
            <li
              className="cursor-pointer hover:text-gray-200"
              onClick={onLogout}
            >
              Odjavi se
            </li>
          ) : (
            <li
              className="cursor-pointer hover:text-gray-200"
              onClick={() => onNavigate("login")}
            >
              Prijava
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

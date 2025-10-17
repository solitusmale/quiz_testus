import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand fw-bold" to="/">
          QuizZone
        </Link>

        {/* Hamburger dugme */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMain"
          aria-controls="navbarMain"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Linkovi */}
        <div className="collapse navbar-collapse" id="navbarMain">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {/* Početna */}
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Početna
              </Link>
            </li>

            {/* Kvizovi dropdown */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="/quizzes"
                id="quizDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Kvizovi
              </a>
              <ul className="dropdown-menu" aria-labelledby="quizDropdown">
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => navigate("/subjects")}
                  >
                    Predmeti
                  </button>
                </li>
                {user && (
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => navigate("/questions/1")}
                    >
                      Random kviz
                    </button>
                  </li>
                )}
              </ul>
            </li>

            {/* Kupi tokene */}
            <li className="nav-item">
              <Link className="nav-link" to="/tokens">
                Kupi tokene
              </Link>
            </li>

            {/* Admin */}
            {user?.role === "admin" && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin">
                  Admin panel
                </Link>
              </li>
            )}

            {/* Moj profil */}
            {user && (
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  Moj profil
                </Link>
              </li>
            )}

            {/* Login / Logout */}
            {user ? (
              <li className="nav-item">
                <button
                  className="btn btn-outline-light btn-sm ms-lg-2"
                  onClick={onLogout}
                >
                  Odjavi se
                </button>
              </li>
            ) : (
              <li className="nav-item">
                <Link
                  className="btn btn-outline-light btn-sm ms-lg-2"
                  to="/login"
                >
                  Prijava
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

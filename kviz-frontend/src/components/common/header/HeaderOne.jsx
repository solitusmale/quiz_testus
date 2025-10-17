import React from "react";
import { Link } from "react-router-dom";

const HeaderOne = ({ user, onLogout }) => {
  return (
    <header>
      {/* Top bar */}
      <div className="bg-light py-2 border-bottom">
        <div className="container d-flex justify-content-between align-items-center">
          <div className="d-none d-sm-block">
            <ul className="list-inline mb-0 small">
              <li className="list-inline-item me-3">
                <i className="fa fa-phone-alt me-1 text-primary"></i>
                <a href="tel:+1234567890" className="text-decoration-none text-dark">
                  +123 456 7890
                </a>
              </li>
              <li className="list-inline-item">
                <i className="fa fa-envelope me-1 text-primary"></i>
                <a href="mailto:hello@quizapp.com" className="text-decoration-none text-dark">
                  hello@quizapp.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            {user ? (
              <button onClick={onLogout} className="btn btn-outline-danger btn-sm">
                Logout
              </button>
            ) : (
              <Link to="/login" className="btn btn-outline-primary btn-sm">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
        <div className="container">
          {/* Logo */}
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/logo.png`}
              alt="Logo"
              height="40"
              className="me-2"
            />
            QuizApp
          </Link>

          {/* Hamburger */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
            aria-controls="mainNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Links */}
          <div className="collapse navbar-collapse" id="mainNavbar">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/subjects">
                  Subjects
                </Link>
              </li>

              {user?.role === "admin" && (
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">
                    Admin
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HeaderOne;

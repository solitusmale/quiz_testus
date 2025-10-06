// src/components/Login.js
import React, { useState } from "react";
import "../styles/login.css";
import Register from "./register"; // import Register

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showRegister, setShowRegister] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost/kviz/login.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    setMessage(data.message);

    if (data.success) {
      if (onLogin) onLogin(data.user);
    }
  };

  const handleRegisterSuccess = (token, username) => {
    if (onLogin) onLogin({ api_token: token, username: username, role: "user" });
  };

if (showRegister) {
  return (
    <div className="login-container">
      <div className="register-box">
        <Register onRegisterSuccess={handleRegisterSuccess} />
        <div className="switch-link">
          <button onClick={() => setShowRegister(false)} className="link-btn">
            Već imate nalog? Prijavite se
          </button>
        </div>
      </div>
    </div>
  );
}


  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            placeholder="Korisničko ime"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="login-input"
          />
          <input
            type="password"
            placeholder="Lozinka"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
          <button type="submit" className="login-button">Prijavi se</button>
        </form>
        {message && <p className="login-message">{message}</p>}
        <div className="switch-link">
          <button onClick={() => setShowRegister(true)} className="link-btn">
            Nemate nalog? Registrujte se
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;

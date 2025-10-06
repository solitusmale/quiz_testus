import React, { useState } from "react";
import "../styles/register.css";

function Register({ onRegisterSuccess }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [registered, setRegistered] = useState(false); // flag za uspešnu registraciju
  const [token, setToken] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost/kviz/register.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (data.success) {
        setMessage(data.message || "Uspešno ste registrovani!");
        setIsError(false);
        setRegistered(true);
        setToken(data.token);

        // Sačuvaj token lokalno
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);

        // Resetuj formu
        setUsername("");
        setEmail("");
        setPassword("");

        if (onRegisterSuccess) onRegisterSuccess(data.token, data.username);
      } else {
        setMessage(data.message || "Došlo je do greške.");
        setIsError(true);
        setRegistered(false);
      }
    } catch (err) {
      console.error(err);
      setMessage("Greška pri konekciji sa serverom.");
      setIsError(true);
      setRegistered(false);
    }
  };

  const handleGoToSubjects = () => {
    if (onRegisterSuccess && token) onRegisterSuccess(token, localStorage.getItem("username"));
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Registracija</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Korisničko ime"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Lozinka"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Registruj se</button>
        </form>
        {message && (
          <p className={`register-message ${isError ? "error" : "success"}`}>
            {message}
          </p>
        )}

        {/* Dugme za prelazak na predmete vidljivo samo kada je registracija uspešna */}
        {registered && (
          <button className="go-subjects-btn" onClick={handleGoToSubjects}>
            Idi na predmete
          </button>
        )}
      </div>
    </div>
  );
}

export default Register;

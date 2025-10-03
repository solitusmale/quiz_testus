import React, { useState } from "react";
import Register from "./components/register";
import Login from "./components/login";
import "./styles/app.css"; // uvoz stilova

function App() {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="app-container">
      {!showRegister ? (
        <div>
          <Login />
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

export default App;


import { Await, BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import { useAuth } from './security/AuthContext.jsx'
import React, { useRef, useState } from 'react'


/**
 * Autor: Jeffrey Böttcher
 * Version: 1.0
 * 
 * Beschreibung:
 * Die `LoginComponent`-Komponente stellt ein Anmeldeformular bereit, bei dem Benutzer ihren Benutzernamen und ihr Passwort eingeben können.
 * Bei erfolgreicher Authentifizierung wird der Benutzer auf eine Willkommensseite weitergeleitet. Bei Fehlschlägen wird eine Fehlermeldung angezeigt.
 */
export default function LoginComponent() {
    
  // Initialisiert die State-Variablen mit leeren Strings
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    let [showErrorMessage, setShowErrorMessage] = useState(false);
    const navigate = useNavigate();
    const authContext = useAuth();
  
    // Funktion zum Aktualisieren des Benutzernamens
    function handleBenutzernameChange(event) {
      setUsername(event.target.value); // Speichert den Benutzernamen aus der Eingabe
    }
  
    // Funktion zum Aktualisieren des Passworts
    function handlePasswortChange(event) {
      setPassword(event.target.value); // Speichert das Passwort aus der Eingabe
    }
  
    // Funktion, die beim Absenden des Formulars aufgerufen wird
    async function handleSubmit() {
      // Authentifizierung durchführen
      if (await authContext.login(username, password)) {
        // Bei erfolgreicher Authentifizierung weiterleiten
        navigate(`/play/recycling/welcome/${username}`);
        console.log('Login erfolgreich');
      } else {
        // Bei fehlgeschlagener Authentifizierung Fehlermeldung anzeigen
        console.log('Login fehlgeschlagen');
        setShowErrorMessage(true);
      }
    }
  
    return (
      <div className="Login">
        {/* Fehlermeldung anzeigen, wenn Login fehlschlägt */}
        {showErrorMessage && <div className='errorMessage'>Anmeldung fehlgeschlagen! Benutzername oder Passwort falsch.</div>}
  
        <div className="LoginForm">
          <div>
            <label>Benutzername</label>
            {/* Eingabefeld für den Benutzernamen */}
            <input type="text" name="username" value={username} onChange={handleBenutzernameChange} />
          </div>
          <div>
            <label>Passwort</label>
            {/* Eingabefeld für das Passwort */}
            <input type="password" name="password" value={password} onChange={handlePasswortChange} />
          </div>
        </div>
        {/* Button zum Absenden des Formulars */}
        <button type="button" name="login" onClick={handleSubmit}>Login</button>
      </div>
    );
  }

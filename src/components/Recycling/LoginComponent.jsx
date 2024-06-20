
import { Await, BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import { useAuth } from './security/AuthContext.jsx'
import React, { useRef, useState } from 'react'



export default function LoginComponent() {
 
    // Zustandsvariablen  mit den Standardwerten 'Admin' und '1234'
    const [username, setUsername] = useState('Admin');
    const [password, setPassword] = useState('1234');
    // Zustandsvariable für die Anzeige einer Fehlermeldung, standardmäßig auf false gesetzt
    let [showErrorMessage, setShowErrorMessage] = useState(false);
    // zum Navigieren zu anderen Routen
    const navigate = useNavigate();
    // Holen des Authentifizierungs-Kontexts, um die Anmeldung zu verwalten
    const authContext = useAuth();

    // Event-Handler-Funktion für Änderungen im Benutzername-Eingabefeld
    function handleBenutzernameChange(event) {
        setUsername(event.target.value); // Aktualisieren des Benutzernamens
    }

    // Event-Handler-Funktion für Änderungen im Passwort-Eingabefeld
    function handlePasswortChange(event) {
        setPassword(event.target.value); // Aktualisieren des Passworts
    }

    // Asynchrone Funktion, die beim Absenden des Formulars aufgerufen wird
    async function handleSubmit() {
        

        // Überprüfen, ob die Anmeldung erfolgreich ist
        if (await authContext.login(username, password)) {
            // Bei erfolgreicher Anmeldung: Navigieren zur Willkommensseite des Benutzers
            navigate(`/play/recycling/welcome/${username}`);
            console.log('success');
        } else {
            // Bei fehlgeschlagener Anmeldung: Anzeigen einer Fehlermeldung
            console.log('failed'); // Protokollierung des Fehlschlags
            setShowErrorMessage(true); // Setzen der Fehlermeldung auf true
        }
    }

    // JSX-Struktur für das Login-Formular
    return (
        
        <div className="Login">
            
            {/* Anzeigen der Fehlermeldung, wenn showErrorMessage true ist */}
            {showErrorMessage && <div className='errorMessage'>Anmeldung Fehlgeschlagen! Benutzername oder Passwort falsch.</div>}

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
            {/* Login-Button, der die handleSubmit-Funktion aufruft */}
            <button type="button" name="login" onClick={handleSubmit}>Login</button>
        </div>
    );
}
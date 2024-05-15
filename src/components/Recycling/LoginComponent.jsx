import { useState } from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import { useAuth } from './security/AuthContext.js'


export default function LoginComponent() {

    const [username, setUsername] = useState('Admin')
    const [password, setPassword] = useState('1234')
    let [showErrorMessage, setShowErrorMessage] = useState(false)
    const navigate = useNavigate();
    const authContext = useAuth();

    function handleBenutzernameChange(event) {
        setUsername(event.target.value)
    }
    function handlePasswortChange(event) {

        setPassword(event.target.value)
    }

    function handleSubmit() {

        if (authContext.login(username, password)) {
            navigate(`/welcome/${username}`)
            console.log('success')

        } else {
            console.log('failed')
            setShowErrorMessage(true)
        }
    }

    return (
        <div className="Login">
            {showErrorMessage && <div className='errorMessage'>Anmeldung Fehlgeschlagen! Benutzername oder Passwort falsch.</div>}

            <div className="LoginForm">
                <div>
                    <label>Benutzername</label>
                    <input type="text" name="username" value={username} onChange={handleBenutzernameChange} />
                </div>
                <div>
                    <label>Passwort</label>
                    <input type="password" name="password" value={password} onChange={handlePasswortChange} />
                </div>
            </div>
            <button type="button" name="login" onClick={handleSubmit}>Login </button>
        </div>
    )
}
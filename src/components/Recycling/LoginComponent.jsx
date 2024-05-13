import { useState } from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'


export default function LoginComponent() {

    const [username, setUsername] = useState('Admin')
    const [password, setPassword] = useState('Password')
    let [showSuccessMessage, setShowSuccessMessage] = useState(false)
    let [showErrorMessage, setShowErrorMessage] = useState(false)
    const navigate = useNavigate();

    function handleBenutzernameChange(event) {
        setUsername(event.target.value)
    }
    function handlePasswortChange(event) {

        setPassword(event.target.value)
    }

    function handleSubmit() {

        if (username === 'Admin' && password === '1234') {
            console.log('Success')
            setShowSuccessMessage(true)
            setShowErrorMessage(false)
            navigate('/games')
        } else {
            console.log('failed')
            setShowSuccessMessage(false)
            setShowErrorMessage(true)
        }
    }

    return (
        <div className="Login">
            {showErrorMessage && <div className='errorMessage'>Anmeldung Fehlgeschlagen! Benutzername oder Passwort falsch.</div>}
            {showSuccessMessage && <div className='successMessage'>Logged </div>}
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
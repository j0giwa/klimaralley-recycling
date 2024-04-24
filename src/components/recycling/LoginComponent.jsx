import { useState } from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'

export default function LoginComponent() {

    const [username, setUsername] = useState('Benutzername')
    const [password, setPassword] = useState('Password')
    let [showSuccessMessage, setShowSuccessMessage] = useState(false)
    let [showErrorMessage, setShowErrorMessage] = useState(false)
    const navigate = useNavigate();

    function handleUsernameChange(event) {
        setUsername(event.target.value)
    }
    function handlePasswordChange(event) {

        setPassword(event.target.value)
    }

    function handleSubmit() {

        if (username === 'Jeffrey' && password === '1234') {
            console.log('Success')
            setShowSuccessMessage(true)
            setShowErrorMessage(false)
            navigate('/loggedIn')
        } else {
            console.log('failed')
            setShowSuccessMessage(false)
            setShowErrorMessage(true)
        }
    }

    return (
        <div className="Login">
            {showErrorMessage && <div className='errorMessage'>Anmeldung fehlgeschlagen. Benutzername oder Passwort falsch</div>}
            {showSuccessMessage && <div className='successMessage'>Authenticated </div>}
            <div className="LoginForm">
                <div>
                    <label>User Name</label>
                    <input type="text" name="username" value={username} onChange={handleUsernameChange} />
                </div>
                <div>
                    <label>Passwort</label>
                    <input type="password" name="password" value={password} onChange={handlePasswordChange} />
                </div>
            </div>
            <button type="button" name="login" onClick={handleSubmit}>Login </button>
        </div>
    )
}
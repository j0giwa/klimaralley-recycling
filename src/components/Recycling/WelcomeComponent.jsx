import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import './RecyclingApp.css'

export default function WelcomeComponent() {
    const navigate = useNavigate();
   
    return (
        <div className="Welcome">
            Bitte loggen Sie sich ein.
            <div>
                <button className='login-button' onClick={handle1}>Anmelden</button><button className='logged-button' onClick={handle2}>bereits angemeldet</button>
            </div>
        </div>
    )

    function handle1() {

       navigate('/login')
      
    }

    function handle2() {

        navigate('/loggedin')
       
     }
}
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom'


export default function WelcomeComponent() {
    const navigate = useNavigate();
   
    return (
        <div className="Welcome">
            Welcome Page
            <div>
                <button onClick={handle1}>Anmelden</button><button onClick={handle2}>bereits angemeldet</button>
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
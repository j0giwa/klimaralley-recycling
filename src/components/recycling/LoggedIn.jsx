import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom'



export default function LoggedIn() {
    
    const navigate = useNavigate();

    return (
        <div className="Logged">
            <h3>Eingeloggt</h3>
            <div className="GamesButton">
                <button className='login-button' name="spiel1" onClick={handleGameOne}>Spiel 1</button><button className='login-button' name="spiel2" >Spiel 2</button><button className='login-button' name="spiel3" >Spiel 3</button>
            </div>

            
        </div>
    )

    function handleGameOne() {
        
        navigate('/gameone')
       
     }
}
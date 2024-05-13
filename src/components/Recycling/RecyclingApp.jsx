
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import LoginComponent from './LoginComponent.jsx'
import WelcomeComponent from './WelcomeComponent.jsx'
import LoggedIn from './LoggedIn.jsx'
import GameOne from '../GameOne/GameOne.jsx'
import HeaderComponent from './HeaderComponent.jsx'
import '../../index.css'



export default function RecyclingApp(){
    return(
        <div className="RecyclingApp">
            <BrowserRouter>
              <HeaderComponent></HeaderComponent>
                <Routes>
                <Route path='' element={<WelcomeComponent/>}></Route>
                    
                    <Route path='/start' element={<WelcomeComponent />}></Route>
                    <Route path='/login' element={<LoginComponent></LoginComponent>}></Route>
                    <Route path='/loggedin' element={<LoggedIn></LoggedIn>}></Route>
                    <Route path='/gameone' element={<GameOne></GameOne>}></Route>

                </Routes>
            </BrowserRouter>
        </div>
    )
}
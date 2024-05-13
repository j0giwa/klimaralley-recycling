
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import LoginComponent from './LoginComponent.jsx'
import WelcomeComponent from './WelcomeComponent.jsx'
import LoggedIn from './LoggedIn.jsx'
import GameOne from '../GameOne/GameOne.jsx'
import HeaderComponent from './HeaderComponent.jsx'
import '../../index.css'
import FooterComponent from './FooterComponent.jsx'
import LogoutComponent from './LogoutComponent.jsx'
import ErrorComponent from './ErrorComponent.jsx'
import ListGamesComponent from './ListGamesComponent.jsx'
import GameComponent from './GameComponent.jsx'



export default function RecyclingApp(){
    return(
        <div className="RecyclingApp">
            <BrowserRouter>
              <HeaderComponent></HeaderComponent>
                {/* body für die Ausrichten siehe RecyclingApp.css */}
                <body>
                <Routes>
               
                <Route path='' element={<WelcomeComponent/>}></Route>
                    
                    <Route path='/start' element={<WelcomeComponent />}></Route>
                    <Route path='/login' element={<LoginComponent></LoginComponent>}></Route>
                    {/* <Route path='/loggedin' element={<ListGamesComponent></ListGamesComponent>}></Route> */}
                    <Route path='/gameone' element={<GameOne></GameOne>}></Route>
                    <Route path='/logout' element={<LogoutComponent></LogoutComponent>}></Route>
                    <Route path='/games' element={<ListGamesComponent></ListGamesComponent>}></Route>
                    <Route path='/game' element={<GameComponent></GameComponent>}></Route>
                    <Route path='/*' element={<ErrorComponent></ErrorComponent>}></Route>
                    
                
                </Routes>
                </body>
                <FooterComponent></FooterComponent>
            </BrowserRouter>
        </div>
    )
}
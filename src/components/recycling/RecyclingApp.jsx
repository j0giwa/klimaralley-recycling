import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import './LoginComponent'
import LoginComponent from './LoginComponent'
import WelcomeComponent from './WelcomeComponent'
import LoggedIn from './LoggedIn'

export default function RecyclingApp(){
    return(
        <div className="RecyclingApp">
                <BrowserRouter>
                <Routes>
                    <Route path='' element={<WelcomeComponent/>}></Route>
                    <Route path='/start' element={<WelcomeComponent />}></Route>
                    <Route path='/login' element={<LoginComponent></LoginComponent>}></Route>
                    <Route path='/loggedin' element={<LoggedIn></LoggedIn>}></Route>
                    
                    
                        
                    
                </Routes>
            </BrowserRouter>
        </div>
    )
}


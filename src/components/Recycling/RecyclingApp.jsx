import { useState } from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import LoginComponent from './LoginComponent.jsx'
import WelcomeComponent from './WelcomeComponent.jsx'
import LoggedIn from './LoggedIn.jsx'
import GameOne from '../GameOne/GameOne.jsx'


export default function RecyclingApp(){
    return(
        <div className="RecyclingApp">
            <BrowserRouter>
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

import { BrowserRouter, Route, Routes,Navigate, useNavigate } from 'react-router-dom'
import LoginComponent from './LoginComponent.jsx'
import WelcomeComponent from './WelcomeComponent.jsx'
import HeaderComponent from './HeaderComponent.jsx'
import '../../index.css'
import FooterComponent from './FooterComponent.jsx'
import LogoutComponent from './LogoutComponent.jsx'
import ErrorComponent from './ErrorComponent.jsx'
import ListGamesComponent from './ListGamesComponent.jsx'
import GameComponent from './GameComponent.jsx'
import AuthProvider, { useAuth } from './security/AuthContext.jsx'
import Quiz from './Question/Quiz.jsx'
import DragDrop from './MuellTennung/DragDrop.jsx'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import React, { useRef, useState } from 'react'



export  function AuthenticatedRoute({ children }) {
    const authContext = useAuth();

    if (authContext.isAuthenticated) {
        console.log('top');
        return children;
        
    }

     
    return <Navigate to="/play/recycling/login" />
}





export default function RecyclingApp(){

//     const audioRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(false);

//   const handlePlayMusic = () => {
//     if (audioRef.current) {
//       audioRef.current.play().catch(error => {
//         console.log("Error playing audio:", error);
//       });
//       setIsPlaying(true);
//     }
//   };

    return(
        
        <div className="RecyclingApp">
             {/* AuthProvider ist ein Context Provider, der den Authentifizierungszustand für alle untergeordneten Komponenten bereitstellt */}
            <AuthProvider>
            <BrowserRouter>
              <HeaderComponent></HeaderComponent>
                {/* <AuthenticatedRoute> ist die Kompenente welche regelt das nur User zugriff auf die entsprechenden Routes erhalten die die Befugniss haben */}
                <Routes>
               
                    <Route path='/play/recycling/' element={<LoginComponent/>}></Route>

                    <Route path='/play/recycling/login' element={<LoginComponent></LoginComponent>}></Route>
                    
                    <Route path='/play/recycling/welcome/:username' element={ <AuthenticatedRoute><WelcomeComponent /></AuthenticatedRoute> }></Route>

                    <Route path='/play/recycling/games' element={<AuthenticatedRoute><ListGamesComponent></ListGamesComponent></AuthenticatedRoute>}></Route>

                    <Route path='/play/recycling/game/:id' element={<AuthenticatedRoute><GameComponent></GameComponent></AuthenticatedRoute>}></Route>

                    <Route path='/play/recycling/logout' element={<AuthenticatedRoute><LogoutComponent></LogoutComponent></AuthenticatedRoute>}></Route>           

                    <Route path='/play/recycling/*' element={<ErrorComponent></ErrorComponent>}></Route>

                    <Route path='/play/recycling/quiz/:id' element={<AuthenticatedRoute><Quiz></Quiz></AuthenticatedRoute>}></Route>

                     <Route path='/play/recycling/muellSortieren' element={<AuthenticatedRoute>
                            {/* Drag an Provider für das Spiel */}
                            <DndProvider backend={HTML5Backend}> 
                                <DragDrop />
                            </DndProvider>
                            </AuthenticatedRoute>} />

                    
                
                </Routes>
                
                <FooterComponent></FooterComponent>
            </BrowserRouter>
            </AuthProvider>
        </div>
    )
}
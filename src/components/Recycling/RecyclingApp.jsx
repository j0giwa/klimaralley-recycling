
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
import GameRecyclebar from './recyclebar/GameRecyclebar.jsx'
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
                {/* <AuthenticatedRoute></AuthenticatedRoute> wird erstmal rausgenommen, SPÄTER WIEDER EINFÜGEN */}
                    <Route path='/play/recycling/' element={<LoginComponent/>}></Route>

                    <Route path='/play/recycling/login' element={<LoginComponent></LoginComponent>}></Route>
                    
                    <Route path='/play/recycling/welcome/:username' element={ <WelcomeComponent /> }></Route>

                    <Route path='/play/recycling/games' element={<ListGamesComponent></ListGamesComponent>}></Route>

                    <Route path='/play/recycling/game/:id' element={<GameComponent></GameComponent>}></Route>

                    <Route path='/play/recycling/logout' element={<LogoutComponent></LogoutComponent>}></Route>           

                    <Route path='/play/recycling/*' element={<ErrorComponent></ErrorComponent>}></Route>

                    <Route path='/play/recycling/quiz/:id' element={<Quiz></Quiz>}></Route>

                    <Route path='/play/recycling/muellSortieren' element={
                            <DndProvider backend={HTML5Backend}> 
                                <DragDrop />
                            </DndProvider>
                            } />

                    <Route path='/play/recycling/recyclebar' element={
                            <DndProvider backend={HTML5Backend}> 
                                <GameRecyclebar />
                            </DndProvider>
                            } />
                    



                    
                
                </Routes>
                
                <FooterComponent></FooterComponent>
            </BrowserRouter>
            </AuthProvider>
        </div>
    )
}
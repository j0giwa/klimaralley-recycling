
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
import Karte from './Question/Karte.jsx'
import DragDrop from './MuellTennung/DragDrop.jsx'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'



export  function AuthenticatedRoute({ children }) {
    const authContext = useAuth();

    if (authContext.isAuthenticated) {
        console.log('top');
        return children;
        
    }

     
    return <Navigate to="/login" />
}





export default function RecyclingApp(){
    return(
        <div className="RecyclingApp">
            
            <AuthProvider>
            <BrowserRouter>
              <HeaderComponent></HeaderComponent>
                
                
                <Routes>
               
                    <Route path='' element={<LoginComponent/>}></Route>

                    <Route path='/login' element={<LoginComponent></LoginComponent>}></Route>
                    
                    <Route path='/welcome/:username' element={ <AuthenticatedRoute><WelcomeComponent /></AuthenticatedRoute> }></Route>

                    <Route path='/games' element={<AuthenticatedRoute><ListGamesComponent></ListGamesComponent></AuthenticatedRoute>}></Route>

                    <Route path='/game/:id' element={<AuthenticatedRoute><GameComponent></GameComponent></AuthenticatedRoute>}></Route>

                    <Route path='/logout' element={<AuthenticatedRoute><LogoutComponent></LogoutComponent></AuthenticatedRoute>}></Route>           

                    <Route path='/*' element={<ErrorComponent></ErrorComponent>}></Route>

                    <Route path='/quiz' element={<Karte></Karte>}></Route>

                     {/* <DndProvider backend={HTML5Backend}><Route path='/muellSortieren' element={<DragDrop/>}></Route></DndProvider>  */}

                     <Route path='/muellSortieren' element={
                            <DndProvider backend={HTML5Backend}>
                                <DragDrop />
                            </DndProvider>
                        } />

                    
                
                </Routes>
                
                <FooterComponent></FooterComponent>
            </BrowserRouter>
            </AuthProvider>
        </div>
    )
}
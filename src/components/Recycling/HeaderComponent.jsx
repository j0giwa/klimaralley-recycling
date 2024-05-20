import { Link } from 'react-router-dom';
import React from 'react'
import { useAuth } from './security/AuthContext';

export default function HeaderComponent() {

  const authContext = useAuth()
  const isAuthenticated = authContext.isAthenticated

  function logout(){
    authContext.logout()
  }



    return (
      <header className="bg-white border-b border-gray-200 shadow-md">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center">

            {/* Logo */}
            <div className="flex-shrink-0">
              < Link to="https://www.youtube.com/watch?v=END_WYdf8pw" className="text-lg font-semibold text-gray-800">Lemgo Rallye</Link>
            </div>
  
            
            <nav className="flex space-x-4">
              
              <ul className="flex space-x-4">
                
                  <NavItem to="/start">Home</NavItem>{/* {isAuthenticated &&} */}
                
                 <NavItem to="/games">Spiele</NavItem>
              </ul>
  
              <ul className="flex space-x-4">

                {!isAuthenticated && <NavItem to="/login">Login</NavItem>}
                
                 <NavItem to="/logout" onClick={logout}>Logout</NavItem>

              </ul>

            </nav>
          </div>
        </div>
      </header>
    );
  }
  
  // Komponente für ein einzelnes Navigations-Item mit Link
  function NavItem({ to, children }) {
    return (
      <li className="text-lg">
        <Link to={to} className="text-blue-500 hover:text-blue-600">{children}</Link>
      </li>
    );
  }

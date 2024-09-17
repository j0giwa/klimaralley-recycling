
import { Link } from 'react-router-dom';
import React from 'react';
import { useAuth } from './security/AuthContext.jsx';


/**
 * Autor: Jeffrey Böttcher
 * Version: 1.0
 * 
 * Beschreibung: 
 * Diese Komponente stellt die Kopfzeile (Header) einer Webanwendung dar, die Links zu verschiedenen Seiten wie 
 * "Home", "Spiele", "Login" und "Logout" anzeigt. Je nach Authentifizierungsstatus (über `AuthContext`) 
 * werden bestimmte Links angezeigt. Die Komponente nutzt `react-router-dom` für die Navigation und `useAuth` 
 * aus dem AuthContext für die Authentifizierungslogik.
 */
export default function HeaderComponent() {
  const authContext = useAuth();
  const isAuthenticated = authContext.isAuthenticated;

  function logout() {
    authContext.logout();
  }

  return (
    <header className="bg-white border-b border-gray-200 shadow-md">
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center">

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="https://www.youtube.com/watch?v=3f2g4RMfhS0" className="text-lg font-semibold text-gray-800">Lemgo Rallye</Link>
          </div>


        {/* isAuthenticated regelt dass das Menü nur angezeigt wird sobald man eingeloggt ist */}
          <nav className="flex space-x-4">
            <ul className="flex space-x-4">
              {/* {isAuthenticated && ( */}
                <li className="text-lg">
                  <Link to="/play/recycling/start" className="text-blue-500 hover:text-blue-600">Home</Link>
                </li>
              {/* )} */}
              {/* {isAuthenticated && ( */}
                <li className="text-lg">
                  <Link to="/play/recycling/games" className="text-blue-500 hover:text-blue-600">Spiele</Link>
                </li>
              {/* )} */}
            </ul>

            <ul className="flex space-x-4">
              {/* {!isAuthenticated && ( */}
                <li className="text-lg">
                  <Link to="/play/recycling/login" className="text-blue-500 hover:text-blue-600">Login</Link>
                </li>
              {/* )} */}
              {/* {isAuthenticated && ( */}
                <li className="text-lg">
                  <Link to="/play/recycling/logout" onClick={logout} className="text-blue-500 hover:text-blue-600">Logout</Link>
                </li>
              {/* )} */}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

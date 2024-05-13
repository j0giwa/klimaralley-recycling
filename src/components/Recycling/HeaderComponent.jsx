import { Link } from 'react-router-dom';
import React from 'react'

export default function HeaderComponent() {
    return (
      <header className="bg-white border-b border-gray-200 shadow-md">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center">

            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="text-lg font-semibold text-gray-800">Lemgo Rallye</Link>
            </div>
  
            
            <nav className="flex space-x-4">
              
              <ul className="flex space-x-4">
                <NavItem to="/start">Home</NavItem>
                <NavItem to="/loggedIn">Spiele</NavItem>
              </ul>
  
              <ul className="flex space-x-4">
                <NavItem to="/login">Login</NavItem>
                <NavItem to="/logout">Logout</NavItem>
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
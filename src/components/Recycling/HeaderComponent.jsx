// import { Link } from 'react-router-dom';
// import React from 'react'
// import { useAuth } from './security/AuthContext.jsx';

// export default function HeaderComponent() {

//   const authContext = useAuth()
//   const isAuthenticated = authContext.isAthenticated

//   function logout(){
//     authContext.logout()
//   }



//     return (
//       <header className="bg-white border-b border-gray-200 shadow-md">
//         <div className="container mx-auto px-4 py-2">
//           <div className="flex justify-between items-center">

//             {/* Logo */}
//             <div className="flex-shrink-0">
//               < Link to="https://www.youtube.com/watch?v=END_WYdf8pw" className="text-lg font-semibold text-gray-800">Lemgo Rallye</Link>
//             </div>
  
            
//             <nav className="flex space-x-4">
              
//               <ul className="flex space-x-4">
                
//               {isAuthenticated &&   (<NavItem to="/start">Home</NavItem>) } 
                
//               {isAuthenticated &&  (<NavItem to="/games">Spiele</NavItem>)}
//               </ul>
  
//               <ul className="flex space-x-4">

//                 {!isAuthenticated && (<NavItem to="/login">Login</NavItem>)}
                
//                 {isAuthenticated && (<NavItem to="/logout" onClick={logout}>Logout</NavItem>)}

//               </ul>

//             </nav>
//           </div>
//         </div>
//       </header>
//     );
//   }
  
//   // Komponente für ein einzelnes Navigations-Item mit Link
//   function NavItem({ to, children }) {
//     return (
//       <li className="text-lg">
//         <Link to={to} className="text-blue-500 hover:text-blue-600">{children}</Link>
//       </li>
//     );
//   }

import { Link } from 'react-router-dom';
import React from 'react';
import { useAuth } from './security/AuthContext.jsx';

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
            <Link to="https://www.youtube.com/watch?v=3UFUyFg2-aI" className="text-lg font-semibold text-gray-800">Lemgo Rallye</Link>
          </div>


        {/* isAuthenticated regelt dass das Menü nur angezeigt wird sobald man eingeloggt ist */}
          <nav className="flex space-x-4">
            <ul className="flex space-x-4">
              {isAuthenticated && (
                <li className="text-lg">
                  <Link to="/start" className="text-blue-500 hover:text-blue-600">Home</Link>
                </li>
              )}
              {isAuthenticated && (
                <li className="text-lg">
                  <Link to="/games" className="text-blue-500 hover:text-blue-600">Spiele</Link>
                </li>
              )}
            </ul>

            <ul className="flex space-x-4">
              {!isAuthenticated && (
                <li className="text-lg">
                  <Link to="/login" className="text-blue-500 hover:text-blue-600">Login</Link>
                </li>
              )}
              {isAuthenticated && (
                <li className="text-lg">
                  <Link to="/logout" onClick={logout} className="text-blue-500 hover:text-blue-600">Logout</Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

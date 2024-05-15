import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState(null);

  function login(username, password) {
    if (username === 'Admin' && password === '1234') {
      setAuthenticated(true);
      setUsername(username);
      return true;
    } else {
      setAuthenticated(false);
      setUsername(null);
      return false;
    }
  }

  function logout() {
    setAuthenticated(false);
  }

  return (
    React.createElement(AuthContext.Provider, { value: { isAuthenticated, login, logout, username } },
      children
    )
  );
}

import React, { createContext, useContext, useState } from "react";
import {  executeJWTAuthenticationService } from "../api/AuthenticationApiService";
import { apiClient } from "../api/ApiClient";

export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({ children }) {

  const [isAuthenticated, setAuthenticated] = useState(false)

  const [username, setUsername] = useState(null)

  const [token, setToken] = useState(null)

  // function login(username, password) {

  //   if (username === 'Admin' && password === '1234') {
  //     console.log('logged')
  //     setAuthenticated(true)
  //     setUsername(username)
  //     return true

  //   } else {
  //     setAuthenticated(false)
  //     setUsername(null)
  //     return false
  //   }
  // }

  async function login(username, password) {

    try {

      const response = await executeJWTAuthenticationService(username, password)
      const jwtToken = 'Bearer ' + response.data.token
      
      if (response.status == 200) {
        setAuthenticated(true)
        setUsername(username)
        setToken(jwtToken)

        apiClient.interceptors.request.use(
          (config) => {
            // console.log('intercepting and adding a token')
            config.headers.Authorization = jwtToken
            return config
          }
        )

        return true

      } else {
        console.error('Es gab einen Fehler:', error.message);
        logout()
        return false

      }
    } catch (error) {
      console.error('Es gab einen Fehler:', error.message);
      console.error('Fehlerdetails:', error);
      logout()
      return false
    }
  }



  function logout() {
    setAuthenticated(false)
    setUsername(null)
    setToken(null)
  }

  return (

    <AuthContext.Provider value={{ isAuthenticated, login, logout, username, token }}>
      {children}
    </AuthContext.Provider>
  )
}

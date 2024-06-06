import { apiClient } from "./ApiClient";

export function executeJWTAuthenticationService(username, password) {
    return apiClient.post("/authenticate", {username,password})}

import axios from "axios";



const apiClient = axios.create(
    {
        baseURL: 'http://localhost:8080'
    }
)


export function retrieveAllGamesForUserApi(username){
    return apiClient.get(`/users/${username}/games`)
}

export function deleteGameApi(username,id){
    return apiClient.delete(`/users/${username}/games/${id}`)
}

export function retrieveGameApi(username,id){
    return apiClient.get(`/users/${username}/games/${id}`)
}
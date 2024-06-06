import { apiClient } from './ApiClient.js';



export function retrieveAllGamesForUserApi(username){
    return apiClient.get(`/users/${username}/games`)
}

export function deleteGameApi(username,id){
    return apiClient.delete(`/users/${username}/games/${id}`)
}

export function retrieveGameApi(username,id){
    return apiClient.get(`/users/${username}/games/${id}`)
}

export function updateGameApi(username,id,game){
    return apiClient.put(`/users/${username}/games/${id}`,game)
}
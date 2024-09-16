import { apiClient } from './ApiClient.js';



export function getGamesByPlayer(playerId) {
    return apiClient.get(`/recyclingapi/player-games/player/${playerId}`);
}

export function deleteGameApi(username,id){
    return apiClient.delete (`/users/${username}/games/${id}`)
}

export function retrieveGameApi(username,id){
    return apiClient.get(`/users/${username}/games/${id}`)
}

// export function updateGameApi(username,id,game){
//     return apiClient.put(`/users/${username}/games/${id}`,game)
// }

export function getPlayerGameByIdApi(id){
    return apiClient.get(`/recyclingapi/player-games/${id}`)
}

export function getPlayerGameApi(id){
    return apiClient.get(`/recyclingapi/player-games/playergame/${id}`)
}



// Das gesamte Spiel! Wichtig RUFT ALLE SPIELE EINES SPIELERS AB
export function getPlayerGameApiDto(playerId){
    return apiClient.get(`/recyclingapi/player-games/dto/${playerId}`)
}

// Das gesamte Spiel! Wichtig Ruft EIN SPIEL EINES SPIELERS AB
export function getPlayerGameByIdApiDto(playerId,gameId){
    return apiClient.get(`/recyclingapi/player-games/dto/${playerId}/${gameId}`)
}

//zum Updaten des Spiels, SEHR WICHTIG; EIN SPIEL EINES SPIELERS
export function updateGameApi(playerId,gameId,game){
    return apiClient.put(`/recyclingapi/player-games/dto/update/${playerId}/${gameId}`,game) 
}
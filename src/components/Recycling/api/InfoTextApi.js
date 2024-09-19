import { apiClient } from './ApiClient.js';


/**
 * 
 * 
 * Autor: Jeffrey Böttcher
 * 
 * 
 * */



export function getAllInfoText() {
    return apiClient.get(`/recyclingapi/game-info-texts/all`);
}

export function createGameInfoText(gameInfoTextDTO) {
    return apiClient.post(`/recyclingapi/game-info-texts/create`, gameInfoTextDTO);
}

export function deleteGameInfoText(id) {
    return apiClient.delete(`/recyclingapi/game-info-texts/${id}`);
}


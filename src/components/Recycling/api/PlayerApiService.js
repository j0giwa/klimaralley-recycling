import { apiClient } from './ApiClient.js';



export function getPlayerByUsernameApi(username) {
    return apiClient.get(`/recyclingapi/players/username/${username}`);
}

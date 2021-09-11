import axios from 'axios';

const instance = axios.create({
    // withCredentials: true,
    baseURL: 'https://pokeapi.co/api/v2/',
});

export const pokemonApi = {
    getPokemons(offset, limit){
        return instance.get(`pokemon/?offset=${offset}&limit=${limit}`).then(
            response => {
                return response.data;
            }
        );
    },
    getPokemon(url){
        return axios.get(url).then(
            response => {
                return response.data;
            }
        );
    }
}
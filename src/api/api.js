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
    getPokemonById(id){
        return instance.get(`pokemon/${id}`).then(
            response => {
                return response.data;
            }
        );
    },

    getPokemonByUrl(url){
        return axios.get(url).then(
            response => {
                return response.data;
            }
        );
    },
    getByUrl(url){
        return axios.get(url).then(
            response => {
                return response.data;
            }
        );
    },
}
import classes from './Pokemons.module.css'
import {Pokemon} from "./pokemon/Pokemon";
import {pokemonApi} from "../../api/api";
import {useEffect, useState} from "react";


export const Pokemons = (props) => {
    const [pokemonURLs, setPokemonURLs] = useState([]);
    const [pokemon, setPokemon] = useState(0)

    const getPokemonUrls = (offset, limit) => {
        pokemonApi.getPokemons(offset, limit).then(
            data => {
                setPokemonURLs(data.results);
            }
        );
    }

    useEffect(()=>{
        getPokemonUrls(Math.floor(Math.random()*1000), 8);
    },[]);
    useEffect(()=>{
        const pokemonArray = [];
        pokemonURLs.forEach(p=>{
            pokemonApi.getPokemon(p.url).then(
                data =>{
                    pokemonArray.push(data);
                    setPokemon(pokemonArray.slice());
                }
            )
        });
        setPokemon(pokemon);
        }, [pokemonURLs]);
    return (
        <div  className={classes.pokemon}>
            {
                pokemon ? pokemon.map(p=>{
                    return <Pokemon name={p.name} imgUrl={p.sprites.other['official-artwork'].front_default} />
                }) : 'not found'
            }
        </div>
    )
}
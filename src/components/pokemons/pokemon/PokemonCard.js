import {useEffect, useState} from "react";
import {pokemonApi} from "../../../api/api";

export const PokemonCard = (props) => {
    const [pokemon, setPokemon] = useState(0);
    useEffect(()=>{
        pokemonApi.getPokemonById(props.id).then(
            data => setPokemon(data)
        )
    });

    return <>
        <h2>{pokemon.name}</h2>
        <div><img src={pokemon && pokemon.sprites.other['official-artwork'].front_default} /></div>
    </>
}
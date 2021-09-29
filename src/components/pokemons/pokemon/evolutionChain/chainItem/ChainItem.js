import {useEffect, useState} from "react";
import {pokemonApi} from "../../../../../api/api";
import {Link} from "react-router-dom";


export const ChainItem = (props) => {
    const [pokemon, setPokemon] = useState(0);
    useEffect(()=>{
        if(props.name){
            pokemonApi.getPokemonById(props.name).then(
                data => setPokemon(data)
            )
        }
    },[props.name])
    return pokemon ? <div style={{width: `${props.width}%`}} >
        <Link to={`/card/${pokemon.id}`}>
            <img src={pokemon.sprites.other['official-artwork'].front_default} alt={'pokemon image'} />
            {pokemon.name}
        </Link>
    </div> : '...'
}
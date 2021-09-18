import {useEffect, useState} from "react";
import {pokemonApi} from "../../../../api/api";
import classes from './PokemonCard.module.css';

export const PokemonCard = (props) => {
    const [pokemon, setPokemon] = useState(0);
    const [description, setDescription] = useState('...')
    useEffect(()=>{
        pokemonApi.getPokemonById(props.id).then(
            data => setPokemon(data)
        )
    },[props.id]);
    useEffect(()=>{
        if(pokemon){
            pokemonApi.getByUrl(pokemon.species.url).then(
                data => setDescription(data.flavor_text_entries[0].flavor_text)
            )
        }
    }, [pokemon]);

    return <>
        <div className={classes.card}>
            <div className={classes.card__left}>
                <div className={classes.image__wrapper}>
                    <img src={pokemon && pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name + ' photo'} />
                </div>
            </div>
            <div>
                <h2>{pokemon.name}</h2>
                <p>{description}</p>
            </div>
        </div>
    </>
}
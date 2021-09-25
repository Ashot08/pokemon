import classes from './Pokemon.module.css';
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {pokemonApi} from "../../../api/api";
import {Preloader} from "../../common/Preloader";
export const Pokemon = (props) => {
    const [pokemon, setPokemon] = useState(0);
    const [preloader, setPreloader] = useState(false);
    useEffect(() => {
        setPreloader(true);
        pokemonApi.getPokemonByUrl(props.url).then(
            data => {
                setPokemon(data);
                setPreloader(false);
            }
        )
    }, [props.url])
    return (
        pokemon ?
        <Link to={`/card/${pokemon.id}`}>
            <div className={classes.pokemon}>
                <img src={pokemon.sprites.other['official-artwork'].front_default} alt={'pokemon image'} />
                <h3>{pokemon.name}</h3>
            </div>
        </Link> : <Preloader />

    )
}
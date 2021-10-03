import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {pokemonApi} from "../../../api/api";
import {Preloader} from "../../common/Preloader";
import classes from './Fighter.module.css';

export const Fighter = (props) => {
    const [pokemon, setPokemon] = useState(0);

    useEffect(() => {
        pokemonApi.getPokemonByUrl(props.url).then(
            data => {
                setPokemon(data);
            }
        )
    }, [props.url])
    return (
        pokemon ?
            <div className={classes.fighter}>
                <div>
                    <img src={pokemon.sprites.front_default} alt={'pokemon image'}/>
                </div>
            </div> : <Preloader/>

    )
}
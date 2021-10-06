import {useEffect, useState} from "react";
import {pokemonApi} from "../../../api/api";
import {Preloader} from "../../common/Preloader";
import classes from './Fighter.module.css';
export const Fighter = (props) => {
    const [pokemon, setPokemon] = useState(0);
    useEffect(() => {
        pokemonApi.getPokemonById(props.id).then(
            data => {
                setPokemon(data);
            }
        )
    }, [props.id])
    return (
        pokemon ?
            <div className={classes.fighter}>
                <div>
                    <img className={classes.fighter__img} src={pokemon.sprites.front_default} alt={'pokemon image'}/>
                </div>
            </div> : <Preloader/>

    )
}
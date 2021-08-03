import classes from './Pokemons.module.css'
import {Pokemon} from "./pokemon/Pokemon";
export const Pokemons = (props) => {
    return (

        <div className={classes.pokemon}>
            <Pokemon />
        </div>

    )
}
import {Pokemons} from "../pokemons/Pokemons";
import classes from "./Main.module.css";
import {Route} from 'react-router-dom';
import {PokemonCard} from "../pokemons/pokemon/PokemonCard";

export const Main = (props) => {
    return (
        <main>
            <div className={classes.container}>
                <Route exact path={'/:page?'} render={(props)=><Pokemons currentPage={props.match.params.page} />} />
                <Route path={'/card/:id?'} render={(props)=><PokemonCard id={props.match.params.id} />} />
            </div>
        </main>
    )
}
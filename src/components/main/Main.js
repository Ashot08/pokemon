import {Pokemons} from "../pokemons/Pokemons";
import classes from "./Main.module.css";
import {Route} from 'react-router-dom';
import {PokemonCard} from "../pokemons/pokemon/pokemonCard/PokemonCard";
import {FightScene} from "../fightScene/FightScene";

export const Main = (props) => {
    return (
        <main>
            <div className="container">
                <Route exact path={'/'} render={(props)=><Pokemons />} />
                <Route exact path={'/catalog/:page?'} render={(props)=><Pokemons currentPage={props.match.params.page} />} />
                <Route path={'/card/:id?'} render={(props)=><PokemonCard id={props.match.params.id} />} />
                <Route path={'/fight-scene/'} render={(props)=><FightScene />} />
            </div>
        </main>
    )
}
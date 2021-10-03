import {useEffect, useState} from "react";
import {pokemonApi} from "../../api/api";
import {Fighter} from "./fighter/Fighter";
import classes from './FightScene.module.css';

export const FightScene = (props) => {
    const limit = 40;
    const [pokemonURLs, setPokemonURLs] = useState([]);
    const getPokemonUrls = (offset, limit) => {
        pokemonApi.getPokemons(offset, limit).then(
            data => {
                setPokemonURLs(data.results);
            }
        );
    }

    useEffect(() => {
        const offset = 0
        getPokemonUrls(offset, limit);
    }, [limit]);

    return <>
        <div>scene</div>
        <div className={classes.fighters}>
            {
                pokemonURLs ? pokemonURLs.map(p => {
                    return <Fighter key={p.name} url={p.url}/>
                }) : 'not found'
            }
        </div>
    </>
}
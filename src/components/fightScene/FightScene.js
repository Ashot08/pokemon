import {useEffect, useState} from "react";
import {pokemonApi} from "../../api/api";
import {Fighter} from "./fighter/Fighter";

export const FightScene = (props) => {
    const limit = 2;
    const [count, setCount] = useState();
    const [pokemonURLs, setPokemonURLs] = useState([]);
    const getPokemonUrls = (offset, limit) => {
        pokemonApi.getPokemons(offset, limit).then(
            data => {
                setCount(data.count);
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
        <div>
            {
                pokemonURLs ? pokemonURLs.map(p => {
                    return <Fighter key={p.name} url={p.url}/>
                }) : 'not found'
            }
        </div>
    </>
}
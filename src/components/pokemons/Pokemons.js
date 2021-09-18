import classes from './Pokemons.module.css'
import {Pokemon} from "./pokemon/Pokemon";
import {pokemonApi} from "../../api/api";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";


export const Pokemons = (props) => {
    const limit = 8;
    const [count, setCount] = useState();
    const [pokemonURLs, setPokemonURLs] = useState([]);
    const [pokemon, setPokemon] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const getPokemonUrls = (offset, limit) => {
        pokemonApi.getPokemons(offset, limit).then(
            data => {
                setCount(data.count);
                setPokemonURLs(data.results);
            }
        );
    }
    useEffect(() => {
        setCurrentPage(+props.currentPage || 0);
    },[props.currentPage]);

    useEffect(() => {
        const offset = currentPage * limit
        getPokemonUrls(offset, limit);
    }, [currentPage]);

    useEffect(() => {
        const pokemonArray = [];
        pokemonURLs.forEach(p => {
            pokemonApi.getPokemonByUrl(p.url).then(
                data => {
                    pokemonArray.push(data);
                    setPokemon(pokemonArray.slice());
                }
            )
        });
        setPokemon(pokemon);
    }, [pokemonURLs]);
    return (
        <div>
            <div className={classes.pokemons}>
                {
                    pokemon ? pokemon.map(p => {
                        return <Pokemon key={p.id} id={p.id} name={p.name} imgUrl={p.sprites.other['official-artwork'].front_default}/>
                    }) : 'not found'
                }
            </div>
            <div>
                <Link to={`/${+currentPage - 1}`}>
                    <button disabled={currentPage <= 0}> {'<-'}</button>
                </Link>
                <Link to={`/${+currentPage + 1}`}>
                    <button disabled={currentPage*limit + count%limit >= count}> {'->'}</button>
                </Link>
            </div>
        </div>

    )
}
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
    const [currentPage, setCurrentPage] = useState(props.currentPage || 0);
    const [offset, setOffset] = useState( props.currentPage * limit);
    const getPokemonUrls = (offset, limit) => {
        pokemonApi.getPokemons(offset, limit).then(
            data => {
                setCount(data.count);
                setPokemonURLs(data.results);
            }
        );
    }

    useEffect(() => {
        getPokemonUrls(offset, limit);
        setCurrentPage(offset/limit);
    }, [offset]);
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
                <Link to={`/${currentPage}`}>
                    <button disabled={currentPage <= 0} onClick={() => {
                        if (offset > 0) {
                            setOffset(prev => prev - limit)
                        }
                    }
                    }> {'<-'}
                    </button>
                    <button disabled={offset + count%limit >= count} onClick={() => {
                        setOffset(prev => prev + limit)
                    }}> {'->'}
                    </button>
                </Link>
            </div>
        </div>

    )
}
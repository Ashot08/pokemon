import {useEffect, useState} from "react";
import {pokemonApi} from "../../../../api/api";
import classes from './PokemonCard.module.css';

export const PokemonCard = (props) => {
    const [pokemon, setPokemon] = useState(0);
    const [descriptions, setDescriptions] = useState('...');
    const [currentVersion, setCurrentVersion] = useState(0);
    useEffect(()=>{
        pokemonApi.getPokemonById(props.id).then(
            data => setPokemon(data)
        )
    },[props.id]);
    useEffect(()=>{
        if(pokemon){
            pokemonApi.getByUrl(pokemon.species.url).then(
                data => {
                    const engDescriptions = data.flavor_text_entries
                        .filter(a=>a.language.name === 'en')
                        .map((d,i) => <div key={i}><h2>{d.version.name}</h2><p>{d.flavor_text}</p></div>);

                    setDescriptions(engDescriptions);
                }
            )
        }
    }, [pokemon]);

    return <>
        <div className={classes.card}>
            <div className={classes.card__left}>
                <div className={classes.image__wrapper}>
                    <img src={pokemon && pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name + ' photo'} />
                </div>
            </div>
            <div>
                <h2>{pokemon.name}</h2>
                <div>{descriptions[currentVersion || 0]}</div>
                <div>
                    <button disabled={currentVersion === 0} onClick={() => setCurrentVersion(v => v - 1)}>prev</button>
                    <button disabled={currentVersion === descriptions.length - 1} onClick={() => setCurrentVersion(v => v + 1)}>next</button>
                </div>
            </div>
        </div>
    </>
}


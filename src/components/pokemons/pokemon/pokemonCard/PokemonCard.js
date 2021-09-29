import {useEffect, useState} from "react";
import {pokemonApi} from "../../../../api/api";
import classes from './PokemonCard.module.css';
import {Preloader} from "../../../common/Preloader";
import {EvolutionChain} from "../evolutionChain/EvolutionChain";
import {VictoryBar, VictoryChart} from "victory";

export const PokemonCard = (props) => {
    const [pokemon, setPokemon] = useState(0);
    const [descriptions, setDescriptions] = useState('...');
    const [currentVersion, setCurrentVersion] = useState(0);

    useEffect(() => {
        pokemonApi.getPokemonById(props.id).then(
            data => {
                setPokemon(data);
            }
        )
    }, [props.id]);
    useEffect(() => {
        if (pokemon) {
            pokemonApi.getByUrl(pokemon.species.url).then(
                data => {
                    const engDescriptions = data.flavor_text_entries
                        .filter(a => a.language.name === 'en')
                        .map((d, i) => <div key={i}><h2>{d.version.name}</h2><p>{d.flavor_text}</p></div>);

                    setDescriptions(engDescriptions);
                }
            )
        }
    }, [pokemon]);

    return <>
        {pokemon ?
            <div className={classes.card}>
                <div className={classes.card__left}>
                    <div className={classes.image__wrapper}>
                        <img src={pokemon && pokemon.sprites.other['official-artwork'].front_default}
                             alt={pokemon.name + ' photo'}/>
                    </div>
                </div>
                <div>
                    <h2>{pokemon.name}</h2>

                    <div>{descriptions[currentVersion || 0]}</div>
                    <div>
                        <button disabled={currentVersion === 0} onClick={() => setCurrentVersion(v => v - 1)}>prev
                        </button>
                        <button disabled={currentVersion === descriptions.length - 1}
                                onClick={() => setCurrentVersion(v => v + 1)}>next
                        </button>
                    </div>
                    <div>
                        <p>Height: {+pokemon.height / 10 || '...'} m</p>
                        <p>Weight: {+pokemon.weight / 10 || '...'} kg</p>
                    </div>
                </div>
                <div>
                    <h3>Stats</h3>
                    <VictoryChart domainPadding={20}>
                        <VictoryBar
                            style={{ data: { fill: '#F1737F' }}}
                            data={
                                pokemon.stats.map(stat => {
                                    return {stat: stat.stat.name.split('-').join('\n'), value: stat.base_stat}
                                })
                            }
                            x="stat"
                            y="value"
                            domain={{ y: [0, 260]}}
                        />
                    </VictoryChart>
                </div>
                <div>
                    <h3>Evolution Chain</h3>
                    <EvolutionChain speciesURL={pokemon.species.url}/>
                </div>
            </div>
            : <Preloader/>
        }
    </>
}


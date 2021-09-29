import {useEffect, useState} from "react";
import {pokemonApi} from "../../../../api/api";
import {Preloader} from "../../../common/Preloader";
import {ChainItem} from "./chainItem/ChainItem";
import classes from "./EvolutionChain.module.css";

export const EvolutionChain = (props) => {
    const [evolutionChain, setEvolutionChain] = useState(0);
    const [chainLinks, setChainLinks] = useState(0);

    useEffect(() => {
        if (props.speciesURL) {
            pokemonApi.getByUrl(props.speciesURL).then(
                species => pokemonApi.getByUrl(species.evolution_chain.url).then(
                    chain => setEvolutionChain(chain)
                )
            )
        }
    }, [props.speciesURL]);
    useEffect(() => {
        if (evolutionChain) {
            const names = [[{index: 0, name: evolutionChain.chain.species.name}]];
            let currentLinks = evolutionChain.chain.evolves_to;
            addPokemonToChainList(currentLinks, names);
            setChainLinks(names);
        }
    }, [evolutionChain])

    return <>
        <div className={classes.evolution_chain} style={{gridTemplateColumns: `repeat(${chainLinks.length}, 1fr)`}}>
            {
                chainLinks ?
                    chainLinks.map((linksArr, i) => <div className={classes.chain_item} key={i}>
                        {linksArr.map((n, index) => <ChainItem
                            width={linksArr.length > 3 ? 200 / linksArr.length : 100 } key={n.name}
                            index={n.index} name={n.name}/>)}
                    </div>)
                    : <Preloader/>
            }
        </div>
    </>
}

function addPokemonToChainList(currentLinks, pokemonArray, i = 0) {
    i++;
    currentLinks.forEach((pokemon) => {
        if(!pokemonArray[i]) pokemonArray.push([]);
        pokemonArray[i].push({index: i, name: pokemon.species.name});
        if (pokemon.evolves_to.length) addPokemonToChainList(pokemon.evolves_to, pokemonArray, i);
    });
}
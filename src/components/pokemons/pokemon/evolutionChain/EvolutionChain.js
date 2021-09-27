import {useEffect, useState} from "react";
import {pokemonApi} from "../../../../api/api";

export const EvolutionChain = (props) => {
    const [evolutionChain, setEvolutionChain] = useState(0);
    const [chainLinks, setChainLinks] = useState(0);
    useEffect(() => {
        if (props.speciesURL){
            pokemonApi.getByUrl(props.speciesURL).then(
                species => pokemonApi.getByUrl(species.evolution_chain.url).then(
                    chain => setEvolutionChain(chain)
                )
            )
        }
    },[props.speciesURL]);
    useEffect(()=>{
        if(evolutionChain){
            const names = [];
            let currentLink = evolutionChain.chain;
            while(currentLink.evolves_to.length){
                console.log(currentLink);
                names.push( currentLink.species.name );
                currentLink = currentLink.evolves_to[0];
            }
            setChainLinks(names);
        }
    },[evolutionChain])

    return <>{chainLinks}</>
}
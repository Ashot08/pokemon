import {useEffect, useState} from "react";
import {pokemonApi} from "../../api/api";
import {Fighter} from "./fighter/Fighter";
import classes from './FightScene.module.css';

export const FightScene = (props) => {
    const limit = 40;
    const [pokemonURLs, setPokemonURLs] = useState([]);
    const [player1, setPlayer1] = useState({
        id: null,
        isActive: false,
        history: [],
        points: 0
    });
    const [player2, setPlayer2] = useState({
        id: null,
        isActive: false,
        history: [],
        points: 0
    });

    function onClickPokemon(id){
        if(!player1.isActive && !player2.isActive){
            setPlayer1({...player1, id, isActive: true});
        }else if(player1.isActive && !player2.isActive){
            setPlayer2({...player2, id, isActive: true});
        }
    }
    function onResetFighters(){
        setPlayer1({...player1, id: null, isActive: false});
        setPlayer2({...player2, id: null, isActive: false});
    }
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
                    return <Fighter
                        onClick={onClickPokemon}
                        key={p.name}
                        url={p.url}
                        player1Id={player1.id}
                        player2Id={player2.id}
                        player1IsActive={player1.isActive}
                        player2IsActive={player2.isActive}
                    />
                }) : 'not found'
            }
        </div>
        <div>
            <button disabled={!player1.isActive} onClick={() => onResetFighters()}>Reset</button>
            <button disabled={(!player2.isActive)}>Fight!</button>
        </div>
    </>
}
import {useEffect, useState} from "react";
import {pokemonApi} from "../../api/api";
import {FighterIcon} from "./fighterIcon/FighterIcon";
import classes from './FightScene.module.css';
import {Fighters} from "./fighters/Fighters";

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
    const [game, setGame] = useState({
        gameMode: false,
    })
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
    function onFight(){
        setGame({...game, gameMode: true})
    }
    function onBack(){
        setGame({...game, gameMode: false})
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
        <div className={classes.scene}>
            {game.gameMode ? <Fighters /> : 'Выбери покемонов для боя'}
        </div>
        <div>

            {game.gameMode ?
                <div><button onClick={() => onBack()}>Назад</button></div>
                :
                <>
                    <div className={classes.fighters}>
                        {
                            pokemonURLs ? pokemonURLs.map(p => {
                                return <FighterIcon
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
                        <button disabled={(!player2.isActive)} onClick={() => onFight()}>Fight!</button>
                    </div>
                </>
            }
        </div>

    </>
}
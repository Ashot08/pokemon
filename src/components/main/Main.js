import {Pokemons} from "../pokemons/Pokemons";
import classes from "./Main.module.css";

export const Main = (props) => {
    return (
        <main>
            <div className={classes.container}>
                <Pokemons />
            </div>
        </main>
    )
}
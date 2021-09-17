import classes from './Pokemon.modules.css';
import {Link} from "react-router-dom";
export const Pokemon = (props) => {
    return (
        <Link to={`/card/${props.id}`}>
            <div className={classes.pokemon}>
                <img src={props.imgUrl} alt={'pokemon image'} />
                <h3>{props.name}</h3>
            </div>
        </Link>

    )
}
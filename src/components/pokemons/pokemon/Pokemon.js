import classes from './Pokemon.modules.css';
export const Pokemon = (props) => {
    return (
        <div className={classes.pokemon}>
            <img src={props.imgUrl} />
            <h3>{props.name}</h3>
        </div>
    )
}
import {Link} from "react-router-dom";

export const Header = (props) => {
    return (
        <header>
            <div className={"container"}>
                <Link to={'/'}>Home</Link>
            </div>
        </header>
    )
}
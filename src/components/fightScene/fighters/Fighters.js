import {Fighter} from "../fighter/Fighter";

export const Fighters = (props) => {
    return <>
        <Fighter id={props.p1} />
        <Fighter id={props.p2} />
    </>
}

import "./Components.css"
import { NavLink } from 'react-router-dom';

function DeckButton(props) {

    return (
        <button class="DeckButton">
            <NavLink to={`/deck/${props.id}`}>
                <span class="DeckButtonSpan">
                    <label>🏷️ {props.name}</label>
                    <label>🗂️ {props.count}</label>
                </span>
            </NavLink>
        </button>
        
    )
}

export default DeckButton;
import {useParams} from 'react-router-dom';

function Deck() {

    const { id } = useParams();

    return (
        <h1>This is deck {id}</h1>
    )
}

export default Deck;
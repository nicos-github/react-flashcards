
import DeckButton from "./components/DeckButton";
import loadXmlFile from "./components/DeckLoader";
import { useDecks } from "./components/DeckContext";

function Home() {

    const {decks, setDecks} = useDecks();

    function openDeck() {
        loadXmlFile(setDecks); // uses callback
    }

    return (
        <div class="Page">
            <h2>Decks</h2>
            <p>A list of your learnings decks</p>

            <ul class="DeckList">
                {decks.map(deck => (
                    <li key={deck.id}>
                        <DeckButton
                        id={deck.id}
                        name={deck.name}
                        count={deck.cards.length}
                        />
                    </li>
                    ))}
            </ul>

            <span class="DeckLoadSaveSpan">
                <button class="DeckLoadButton" onClick={openDeck}>Open 📂</button>
            </span>
        </div>
    );
}

export default Home;
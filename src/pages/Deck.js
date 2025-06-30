import { useParams } from 'react-router-dom';
import { useDecks } from "./components/DeckContext";
import { useState, useEffect } from 'react';
import { useRef } from 'react';

function Deck() {
    const { id } = useParams();
    const { decks } = useDecks();

    // Find the deck once
    const filteredDeck = decks.find(deck => deck.id === id);

    // State for shuffled cards (initially empty)
    const [shuffledCards, setShuffledCards] = useState([]);
    const [index, setIndex] = useState(0);
    const [round, setRound] = useState(1);
    const [shouldShowAnswer, setShouldShowAnswer] = useState(false);

    // arrays for easy and hard cards
    const cards_easy = useRef([]);
    const cards_hard = useRef([]);

    // Shuffle function
    function shuffleArray(array) {
        const copy = [...array];
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    }

    // Shuffle deck cards the first time the page loads
    useEffect(() => {
        if (filteredDeck) {
            setShuffledCards(filteredDeck.cards);
            setIndex(0);
        }
    }, [filteredDeck]);

    // Get current card based on index
    const currentCard = shuffledCards[index] || {};

    // show the answer
    function showAnswer() {
        setShouldShowAnswer(true);
    }

    function markAsEasy() {
        cards_easy.current.push(currentCard);
        nextCard();
    }

    function markAsHard() {
        cards_hard.current.push(currentCard);
        nextCard();
    }


    // Next card handler
    function nextCard() {
        setShouldShowAnswer(false);
        setIndex(i => (i + 1 < shuffledCards.length ? i + 1 : i));

        if (index + 1 >= shuffledCards.length) {
            restartDeck(); // after all cards are through, restart the deck
        }
    }

    // restart the deck using hard cards first, then easy ones
    function restartDeck() {
        console.log('Restart with the deck');

        const easy = shuffleArray(cards_easy.current);
        const hard = shuffleArray(cards_hard.current);

        const new_cards = hard.concat(easy); // hard first

        setShuffledCards(new_cards);
        setIndex(0);
        setShouldShowAnswer(false);

        // Reset the arrays
        cards_easy.current = [];
        cards_hard.current = [];

        // increment learning round
        setRound(round + 1);
    }

    if (!filteredDeck) return <div>Deck not found</div>;

    return (
        <div>
            <h2>{filteredDeck.name}</h2>
            <h3 class="Question">{currentCard.question || "No cards available"}</h3>
            <h4 class="Answer">
                <div className={shouldShowAnswer ? "show" : ""}>
                    {shouldShowAnswer ? currentCard.answer : null}
                </div>
            </h4>


            {shouldShowAnswer ? ( // if answer is shown, show easy/hard
                <div class="MarkButtonSpan">
                    <button onClick={markAsEasy}>Easy 😴</button>
                    <button onClick={markAsHard}>Hard 🥵</button>
                </div>
            ) : // else show the button to show the answer
                <div class="MarkButtonSpan">
                    <button onClick={showAnswer}>Show Answer</button>
                </div>
            }

            <span class="InfoSpan">
                <p>Card {index + 1} / {shuffledCards.length}</p>
                <p>Round {round}</p>
            </span>


        </div>
    );
}

export default Deck;

import { createContext, useContext, useState } from 'react';

const DeckContext = createContext();

export function useDecks() {
  return useContext(DeckContext);
}

export function DeckProvider({ children }) {
  const [decks, setDecks] = useState([]);

  return (
    <DeckContext.Provider value={{ decks, setDecks }}>
      {children}
    </DeckContext.Provider>
  );
}

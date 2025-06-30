function loadXmlFile(onLoad) {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.flashcards';

  input.onchange = () => {
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(reader.result, 'application/xml');

      const deckElements = Array.from(xml.getElementsByTagName('Deck'));
      const newDecks = deckElements.map(deckEl => ({
        id: deckEl.getAttribute('id'),
        name: deckEl.getAttribute('name'),
        cards: Array.from(deckEl.getElementsByTagName('Card')).map(card => ({
          question: card.getElementsByTagName('Question')[0]?.textContent ?? '',
          answer: card.getElementsByTagName('Answer')[0]?.textContent ?? ''
        }))
      }));

      onLoad([...newDecks]); // append all decks
      console.log(newDecks)
    };

    reader.readAsText(file);
  };

  input.click();
}

export default loadXmlFile;

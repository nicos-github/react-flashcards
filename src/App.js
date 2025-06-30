import './App.css';
import Home from './pages/Home';
import Deck from './pages/Deck';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DeckProvider } from "./pages/components/DeckContext";

function App() {
  return (
    <div className="App">
      <header>
          <h1>Flashcards</h1>
          <p>Practice using spaced repetition</p>
      </header>

      <DeckProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/deck/:id' element={<Deck/>}></Route>
          </Routes>
        </BrowserRouter>
      </DeckProvider>
    </div>
  );
}

export default App;

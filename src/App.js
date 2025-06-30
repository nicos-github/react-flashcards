import './App.css';
import Home from './pages/Home';
import Deck from './pages/Deck';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DeckProvider } from "./pages/components/DeckContext";
import { NavLink } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header>
            <NavLink to='/'>
              <h1>Flashcards</h1>
            </NavLink>
        </header>

        <DeckProvider>
            <Routes>
              <Route path='/' element={<Home/>}></Route>
              <Route path='/deck/:id' element={<Deck/>}></Route>
            </Routes>
        </DeckProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

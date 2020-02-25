import React from 'react';
import './App.css';
import Articolo from './Components/Articolo/Articolo';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Articolo >
          <p>Testo</p>
        </Articolo>
      </header>
    </div>
  );
}

export default App;

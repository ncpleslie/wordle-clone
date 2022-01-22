import { useState } from 'react';
import './App.scss';
import Gameboard from './components/Gameboard/Gameboard';
import Keyboard from './components/Keyboard/Keyboard';
import GameOptions from './models/game-options.model';

function App() {
  const [gameOptionsState] = useState(new GameOptions('lever', 6));

  return (
    <div className="App">
      <Gameboard gameOptions={gameOptionsState} />
      <Keyboard />
    </div>
  );
}

export default App;

import "./App.scss";
import Gameboard from "./components/Gameboard/Gameboard";
import Keyboard from "./components/Keyboard/Keyboard";
import { GameContextProvider } from "./store/game-context";

function App() {
  return (
    <div className="App">
      <GameContextProvider>
        <div className="game">
          <Gameboard />
          <Keyboard />
        </div>
      </GameContextProvider>
    </div>
  );
}

export default App;

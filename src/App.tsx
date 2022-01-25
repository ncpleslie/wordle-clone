import "./App.scss";
import Gameboard from "./components/Gameboard/Gameboard";
import Keyboard from "./components/Keyboard/Keyboard";

function App() {
  return (
    <div className="App">
      <div className="game">
        <Gameboard />
        <Keyboard />
      </div>
    </div>
  );
}

export default App;

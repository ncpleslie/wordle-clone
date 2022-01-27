import "./App.scss";
import Gameboard from "./components/Gameboard/Gameboard";
import Keyboard from "./components/Keyboard/Keyboard";
import Modal from "./components/UI/Modal/Modal";

const App = () => {
  return (
    <>
      <div className="App">
        <div className="game">
          <Gameboard />
          <Keyboard />
        </div>
      </div>

      <Modal />
    </>
  );
};

export default App;

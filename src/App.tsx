import classes from "./App.module.scss";
import Gameboard from "./components/Gameboard/Gameboard";
import Keyboard from "./components/Keyboard/Keyboard";
import Modal from "./components/UI/Modal/Modal";

const App = () => {
  return (
    <>
      <div className={classes.app}>
        <div className={classes["game"]}>
          <Gameboard />
          <Keyboard />
        </div>
      </div>

      <Modal />
    </>
  );
};

export default App;

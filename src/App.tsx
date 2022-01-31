import classes from "./App.module.scss";
import Gameboard from "./components/Gameboard/Gameboard";
import Keyboard from "./components/Keyboard/Keyboard";
import Toast from "./components/UI/Toast/Toast";

const App = () => {
  return (
    <>
      <div className={classes.app}>
        <div className={classes["game"]}>
          <Gameboard />
          <Keyboard />
        </div>
      </div>

      <Toast />
    </>
  );
};

export default App;

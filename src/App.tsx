import classes from "./App.module.scss";
import Gameboard from "./components/Gameboard/Gameboard";
import Header from "./components/Header/Header";
import Keyboard from "./components/Keyboard/Keyboard";
import Toast from "./components/UI/Toast/Toast";
import GameContextProvider from "./store/game-context";

const App = () => {
  return (
    <>
      <GameContextProvider>
        <div className={classes.app}>
          <Header />
          <div className={classes["game"]}>
            <Gameboard />
            <Keyboard />
          </div>
        </div>
        <Toast />
      </GameContextProvider>
    </>
  );
};

export default App;

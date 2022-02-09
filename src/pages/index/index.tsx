import Gameboard from "../../components/Gameboard/Gameboard";
import Keyboard from "../../components/Keyboard/Keyboard";
import Toast from "../../components/UI/Toast/Toast";
import classes from "./index.module.scss";

const Index = () => {
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

export default Index;

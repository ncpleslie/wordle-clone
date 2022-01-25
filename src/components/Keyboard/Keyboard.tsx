import { Fragment } from "react";
import Key from "../UI/Key/Key";
import "./Keyboard.scss";
import { observer } from "mobx-react-lite";
import store from "../../store/game-store";

const Keyboard = observer(() => {
  const handleOnKeyboardKeyClick = (key: string): void => {
    store.onKeyClicked(key);
  };

  let keyboardRowNumber = 0;

  return (
    <div>
      <div className="keyboard">
        {Object.keys(store.keyboardState).map((keyName: string) => {
          if (store.keyboardState[keyName].row !== keyboardRowNumber) {
            keyboardRowNumber = store.keyboardState[keyName].row;

            return (
              <Fragment key={keyName}>
                <div className="keyboard__break"></div>
                <Key
                  character={keyName}
                  usedLocationKnown={
                    store.keyboardState[keyName].usedLocationKnown
                  }
                  usedLocationUnknown={
                    store.keyboardState[keyName].usedLocationUnknown
                  }
                  onKeyClicked={handleOnKeyboardKeyClick}
                />
              </Fragment>
            );
          }

          return (
            <Key
              character={keyName}
              usedLocationKnown={store.keyboardState[keyName].usedLocationKnown}
              usedLocationUnknown={
                store.keyboardState[keyName].usedLocationUnknown
              }
              onKeyClicked={handleOnKeyboardKeyClick}
              key={keyName}
            />
          );
        })}
      </div>
    </div>
  );
});

export default Keyboard;

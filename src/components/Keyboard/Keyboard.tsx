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
          const key = (
            <Key
              character={keyName}
              usedLocationKnown={store.keyboardState[keyName].usedLocationKnown}
              usedLocationUnknown={
                store.keyboardState[keyName].usedLocationUnknown
              }
              onKeyClicked={handleOnKeyboardKeyClick}
              notUsed={store.keyboardState[keyName].notUsed}
              key={keyName}
            />
          );

          if (store.keyboardState[keyName].row !== keyboardRowNumber) {
            keyboardRowNumber = store.keyboardState[keyName].row;

            return (
              <Fragment key={keyName}>
                <div className="keyboard__break"></div>
                {key}
              </Fragment>
            );
          }

          return key;
        })}
      </div>
    </div>
  );
});

export default Keyboard;

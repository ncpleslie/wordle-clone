import { useContext, Fragment } from "react";
import GameCtx from "../../store/game-context";
import Key from "../UI/Key/Key";
import "./Keyboard.scss";

const Keyboard = () => {
  const ctx = useContext(GameCtx);

  const handleOnKeyboardKeyClick = (key: string): void => {
    ctx.onKeyClicked(key);
  };

  const keyboardState = ctx.keyboard.state;

  let keyboardRowNumber = 0;

  return (
    <div>
      <div className="keyboard">
        {Object.keys(keyboardState).map((keyName: string) => {
          if (keyboardState[keyName].row !== keyboardRowNumber) {
            keyboardRowNumber = keyboardState[keyName].row;

            return (
              <Fragment key={keyName}>
                <div className="keyboard__break"></div>
                <Key
                  character={keyName}
                  usedLocationKnown={keyboardState[keyName].usedLocationKnown}
                  usedLocationUnknown={
                    keyboardState[keyName].usedLocationUnknown
                  }
                  onKeyClicked={handleOnKeyboardKeyClick}
                />
              </Fragment>
            );
          }

          return (
            <Key
              character={keyName}
              usedLocationKnown={keyboardState[keyName].usedLocationKnown}
              usedLocationUnknown={keyboardState[keyName].usedLocationUnknown}
              onKeyClicked={handleOnKeyboardKeyClick}
              key={keyName}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Keyboard;

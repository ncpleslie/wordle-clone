import { Fragment, useContext } from "react";
import Key from "../UI/Key/Key";
import "./Keyboard.scss";
import { observer } from "mobx-react-lite";
import { useCallback } from "react";
import { GameContext } from "../../store/game-context";

const Keyboard = observer(() => {
  const store = useContext(GameContext);

  if (!store) {
    return <></>;
  }

  const handleOnKeyboardKeyClick = useCallback(
    async (key: string): Promise<void> => {
      await store.onKeyClicked(key);
    },
    [store.onKeyClicked]
  );

  let keyboardRowNumber = 0;

  return (
    <div>
      <div className="keyboard">
        {Object.keys(store.keyboard).map((keyName: string) => {
          const key = (
            <Key
              character={keyName}
              usedLocationKnown={store.keyboard[keyName].usedLocationKnown}
              usedLocationUnknown={store.keyboard[keyName].usedLocationUnknown}
              onKeyClicked={handleOnKeyboardKeyClick}
              notUsed={store.keyboard[keyName].notUsed}
              key={keyName}
              special={store.keyboard[keyName].special}
            />
          );

          if (store.keyboard[keyName].row !== keyboardRowNumber) {
            keyboardRowNumber = store.keyboard[keyName].row;

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

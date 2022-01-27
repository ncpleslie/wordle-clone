import { Fragment } from "react";
import Key from "../UI/Key/Key";
import "./Keyboard.scss";
import { observer } from "mobx-react-lite";
import store from "../../store/game-store";

const Keyboard = observer(() => {
  const handleOnKeyboardKeyClick = async (key: string): Promise<void> => {
    await store.onKeyClicked(key);
  };

  let keyboardRowNumber = 0;

  if (!store.keyboard) {
    return <></>;
  }

  return (
    <div>
      <div className="keyboard">
        {Object.keys(store.keyboard).map((keyName: string) => {
          const key = (
            <Key
              character={keyName}
              usedLocationKnown={store.keyboard![keyName].usedLocationKnown}
              usedLocationUnknown={store.keyboard![keyName].usedLocationUnknown}
              onKeyClicked={handleOnKeyboardKeyClick}
              notUsed={store.keyboard![keyName].notUsed}
              key={keyName}
              special={store.keyboard![keyName].special}
            />
          );

          if (store.keyboard![keyName].row !== keyboardRowNumber) {
            keyboardRowNumber = store.keyboard![keyName].row;

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

import "./Gameboard.scss";
import CharacterBox from "../UI/CharacterBox/CharacterBox";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import store from "../../store/game-store";

const Gameboard = observer(() => {
  const [gridColStyle] = useState(`grid-cols-${store.getWordLength()}`);

  return (
    <div className={`gameboard grid-cols-5 ${gridColStyle}`}>
      {[...Array(store.getWordLength() * store.getTotalTries())].map((_, i) => (
        <CharacterBox
          key={i}
          character={store.guesses[i]?.character}
          usedLocationCorrect={store.guesses[i]?.usedLocationCorrect}
          usedLocationIncorrect={store.guesses[i]?.usedLocationIncorrect}
          notUsed={store.guesses[i]?.notUsed}
        />
      ))}
    </div>
  );
});

export default Gameboard;

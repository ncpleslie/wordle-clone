import "./Gameboard.scss";
import CharacterBox from "../UI/CharacterBox/CharacterBox";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { GameContext } from "../../store/game-context";

const Gameboard = observer(() => {
  const store = useContext(GameContext);

  if (!store) {
    return <></>;
  }

  return (
    <div className={`gameboard grid-cols-${store.getWordLength()}`}>
      {[...Array(store.getWordLength() * store.getTotalTries())].map((_, i) => {
        const guess = store.getGuessByIndex(i);

        return (
          <CharacterBox
            key={i}
            character={guess.character}
            usedLocationCorrect={guess.usedLocationCorrect}
            usedLocationIncorrect={guess.usedLocationIncorrect}
            notUsed={guess.notUsed}
            invalid={guess.invalid}
          />
        );
      })}
    </div>
  );
});

export default Gameboard;

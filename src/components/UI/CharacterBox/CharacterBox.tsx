import CharacterBoxProps from "../../../props/character-box.props";
import "./CharacterBox.scss";
import { FC, memo } from "react";
import classNames from "classnames";

const CharacterBox: FC<CharacterBoxProps> = memo((props) => {
  const computedStyle = classNames("character-box", {
    "incorrect-location": props.usedLocationIncorrect,
    "correct-location": props.usedLocationCorrect,
    "not-used": props.notUsed,
    invalid: props.invalid,
  });

  return (
    <div className={computedStyle}>
      <p className="character-box__text">{props.character}</p>
    </div>
  );
});

export default CharacterBox;

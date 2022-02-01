import CharacterBoxProps from "../../../props/character-box.props";
import "./CharacterBox.scss";
import { memo } from "react";

const CharacterBox = memo((props: CharacterBoxProps) => {
  return (
    <div
      className={`character-box 
        ${props.usedLocationIncorrect && "incorrect-location"} 
          ${props.usedLocationCorrect && "correct-location"} 
          ${props.notUsed && "not-used"}
          ${props.invalid && "invalid"}
          `}
    >
      <p className="character-box__text">{props.character}</p>
    </div>
  );
});

export default CharacterBox;

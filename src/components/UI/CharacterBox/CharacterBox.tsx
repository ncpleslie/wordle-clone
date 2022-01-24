import CharacterBoxProps from "../../../props/character-box.props";
import "./CharacterBox.scss";

const CharacterBox = (props: CharacterBoxProps) => {
  return (
    <div className="character-box">
      <p className="character-box__text">{props.character}</p>
    </div>
  );
};

export default CharacterBox;

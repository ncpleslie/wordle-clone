import KeyProps from "../../../props/key.props";
import "./Key.scss";

const Key = (props: KeyProps) => {
  const handleOnClick = (): void => {
    props.onKeyClicked(props.character);
  };

  return (
    <button
      className={`key ${props.usedLocationUnknown ? "used-and-unknown" : ""} ${
        props.usedLocationKnown ? "used-and-known" : ""
      }`}
      onClick={handleOnClick}
    >
      <p className="key__text">{props.character.toUpperCase()}</p>
    </button>
  );
};

export default Key;

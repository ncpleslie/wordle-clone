import KeyProps from "../../../props/key.props";
import "./Key.scss";
import { FC, memo } from "react";
import classNames from "classnames";

const Key: FC<KeyProps> = memo((props) => {
  const handleOnClick = (): void => {
    props.onKeyClicked(props.character);
  };

  const computedStyle = classNames("key", {
    "used-and-unknown": props.usedLocationUnknown,
    "used-and-known": props.usedLocationKnown,
    "not-used": props.notUsed,
    special: props.special,
  });

  return (
    <button className={computedStyle} onClick={handleOnClick}>
      <p className="key__text">{props.character.toUpperCase()}</p>
    </button>
  );
});

export default Key;

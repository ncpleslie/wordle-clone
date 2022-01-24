import React, { useState } from "react";
import GameContext from "../models/game-context.model";
import GameOptions from "../models/game-options.model";
import KeyState from "../models/key-state.model";
import KeyboardState from "../models/keyboard-state.model";
import ChildrenProps from "../props/children.props";
import KeyboardConfig from "./keyboard.json";

const GameCtx = React.createContext(new GameContext());

export const GameContextProvider = (props: ChildrenProps) => {
  const [gameOptions, setGameOptions] = useState(new GameOptions("lever", 6));
  const keyboardConfig = KeyboardConfig["en-US"].map(
    (k) => new KeyState(k.character, k.order, k.row)
  );
  const [keyboard, setKeyboard] = useState(new KeyboardState(keyboardConfig));
  const game = new GameContext(gameOptions, keyboard);

  return <GameCtx.Provider value={game}>{props.children}</GameCtx.Provider>;
};

export default GameCtx;

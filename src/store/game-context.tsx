import React, { useState } from "react";
import GameContext from "../models/game-context.model";
import GameOptions from "../models/game-options.model";
import GameState from "../models/game-state.model";
import KeyState from "../models/key-state.model";
import KeyboardState from "../models/keyboard-state.model";
import ChildrenProps from "../props/children.props";
import KeyboardConfig from "./keyboard.json";

const GameCtx = React.createContext(
  new GameContext(new KeyboardState(), new GameState(), undefined, undefined)
);

export const GameContextProvider = (props: ChildrenProps) => {
  const word = "LEVER";
  const tries = 6;

  const keyboardConfig = KeyboardConfig["en-US"].map(
    (k) => new KeyState(k.character, k.order, k.row)
  );
  const [keyboardState, setKeyboardState] = useState(
    new KeyboardState(keyboardConfig)
  );

  const [gameState, setGameState] = useState(
    new GameState(new GameOptions(word, tries))
  );

  const game = new GameContext(
    keyboardState,
    gameState,
    setKeyboardState,
    setGameState
  );

  return <GameCtx.Provider value={game}>{props.children}</GameCtx.Provider>;
};

export default GameCtx;

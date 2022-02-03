import { createContext, useEffect, useState } from "react";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import ChildrenProps from "../props/children.props";
import GameService from "../services/game.service";
import HelperUtil from "../utils/helper.util";
import GameStore from "./game-store";

export const GameContext = createContext<GameStore | null>(null);

const GameContextProvider = (props: ChildrenProps) => {
  const [error, setError] = useState<Error | null>(null);
  const [store, setStore] = useState<GameStore | null>(null);

  useEffect(() => {
    if (!store) {
      (async () => {
        try {
          const gameService = await GameService.createGameService();
          const keyboard = await HelperUtil.generateKeyboard(
            gameService.options.lang
          );
          setStore(new GameStore(gameService, keyboard));
        } catch (error) {
          setError(error as Error);
        }
      })();
    }
  }, []);

  if (error) {
    HelperUtil.removeLoadingIndicator();

    return (
      <div className="flex justify-center items-center m-10">
        <ErrorMessage message={error.message} />
      </div>
    );
  }

  if (!store) {
    return <></>;
  }

  HelperUtil.removeLoadingIndicator();
  return (
    <GameContext.Provider value={store}>{props.children}</GameContext.Provider>
  );
};

export default GameContextProvider;

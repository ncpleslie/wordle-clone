import "./Gameboard.scss";
import CharacterBox from "../UI/CharacterBox/CharacterBox";
import { useContext, useState } from "react";
import GameCtx from "../../store/game-context";

const Gameboard = () => {
  const ctx = useContext(GameCtx);

  const [gridColStyle] = useState(`grid-cols-${ctx.game.options.word.length}`);

  return (
    <div
      className={`gameboard grid-cols-5 ${
        ctx.game.options.word && gridColStyle
      }`}
    >
      {[...Array(ctx.game.options.word.length * ctx.game.options.tries)].map(
        (_, i) => (
          <CharacterBox key={i} character={ctx.game.guesses[i]} />
        )
      )}
    </div>
  );
};

export default Gameboard;

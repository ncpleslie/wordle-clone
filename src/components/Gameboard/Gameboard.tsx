import "./Gameboard.scss";
import CharacterBox from "../UI/CharacterBox/CharacterBox";
import { useContext, useState } from "react";
import GameCtx from "../../store/game-context";

const Gameboard = () => {
  const ctx = useContext(GameCtx);

  const [gridColStyle] = useState(`grid-cols-${ctx.options.word.length}`);

  return (
    <div className={`gameboard ${ctx.options.word && gridColStyle}`}>
      {[...Array(ctx.options.word.length * ctx.options.tries)].map((_, i) => (
        <CharacterBox key={i} />
      ))}
    </div>
  );
};

export default Gameboard;

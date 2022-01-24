import { KeyboardEventKey } from "../enums/keyboard-event-key.enum";
import GameState from "./game-state.model";
import KeyboardState from "./keyboard-state.model";

export default class GameContext {
  constructor(
    keyboard: KeyboardState,
    game: GameState,
    setKeyboard?: React.Dispatch<React.SetStateAction<KeyboardState>>,
    setGame?: React.Dispatch<React.SetStateAction<GameState>>
  ) {
    this.keyboard = keyboard;
    this.game = game;

    if (setKeyboard) {
      this.setKeyboard = setKeyboard;
    }

    if (setGame) {
      this.setGame = setGame;
    }
  }

  public keyboard: KeyboardState;
  public game: GameState;

  public setKeyboard?: React.Dispatch<React.SetStateAction<KeyboardState>>;

  public setGame?: React.Dispatch<React.SetStateAction<GameState>>;

  public onKeyClicked(key: string): void {
    if (key === KeyboardEventKey.Enter) {
      this.game.submit();
      this.updateGame();

      return;
    }

    if (key === KeyboardEventKey.Backspace) {
      this.game.undo();
      this.updateGame();

      return;
    }

    this.game.addGuess(key);
    this.keyboard.setKeyLocationKnown(key);

    this.updateGame();
    this.updateKeyboard();
  }

  private updateKeyboard(): void {
    if (!this.setKeyboard) {
      throw new Error("Unable to set keyboard as it is undefined");
    }

    this.setKeyboard(new KeyboardState(this.keyboard.state));
  }

  private updateGame(): void {
    if (!this.setGame) {
      throw new Error("Unable to set game as it is undefined");
    }

    this.setGame(new GameState(this.game.options, this.game.guesses));
  }
}

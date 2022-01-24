import GameOptions from "./game-options.model";
import KeyboardState from "./keyboard-state.model";

export default class GameContext {
  constructor(options?: GameOptions, keyboard?: KeyboardState) {
    this.options = options || new GameOptions();
    this.keyboard = keyboard || new KeyboardState();
  }

  public options: GameOptions;
  public keyboard: KeyboardState;

  public onKeyClicked(key: string): void {
    console.log(key);
  }
}

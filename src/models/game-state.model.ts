import GameOptions from "./game-options.model";

export default class GameState {
  constructor(options?: GameOptions, guesses?: string[]) {
    this.options = options || new GameOptions();

    if (!guesses) {
      this.guesses = [];

      return;
    }

    this.guesses = guesses;
  }

  public options: GameOptions;
  public guesses: string[];

  public addGuess(guess: string): void {
    if (this.guesses.length >= this.options.word.length) {
      return;
    }

    this.guesses.push(guess);
  }

  public submit(): void {
    if (
      this.guesses.length !== 0 &&
      this.guesses.length % this.options.word.length == 0
    ) {
      console.log("submit");
    }
  }

  public undo(): void {
    this.guesses.pop();
  }
}

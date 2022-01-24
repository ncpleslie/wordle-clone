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
    const wordLength = this.options.word.length;
    const guessesLength = this.guesses.length;

    if (guessesLength !== 0 && guessesLength % wordLength === 0) {
      const row = guessesLength / wordLength - 1;
      const start = row * wordLength;
      const end = wordLength * row + start || wordLength;
      const currentGuess = this.guesses.slice(start, end).join("");

      if (currentGuess === this.options.word) {
        console.log("winner");
      }
    }
  }

  public undo(): void {
    this.guesses.pop();
  }
}

import GameOptions from "../models/game-options.model";
import GuessState from "../models/guess-state.model";

export default class GameService {
  private row = 0;

  constructor(options: GameOptions) {
    this.options = options;
    this.guesses = [...Array(this.options.tries)].map(() => Array(0));
  }

  private guesses: GuessState[][];
  public options: GameOptions;

  public getGuesses(): GuessState[] {
    return this.guesses.flat();
  }

  public addGuess(guess: string): void {
    if (this.guesses[this.row].length >= this.options.word.length) {
      return;
    }

    this.guesses[this.row].push(new GuessState(guess));
  }

  public submit(): void {
    const wordLength = this.options.word.length;
    const guessesLength = this.guesses[this.row].length;

    if (guessesLength === 0 || guessesLength % wordLength !== 0) {
      return;
    }

    for (let i = 0; i < guessesLength; i++) {
      const currentGuess = this.guesses[this.row][i].character;
      const wordArray = this.options.word.split("");

      // Check if character is correct and in the right spot.
      if (currentGuess === wordArray[i]) {
        this.guesses[this.row][i].usedLocationCorrect = true;

        continue;
      }

      // Check if character is correct but in incorrect spot.
      if (wordArray.includes(currentGuess)) {
        this.guesses[this.row][i].usedLocationIncorrect = true;

        continue;
      }

      // Every other character is not used.
      this.guesses[this.row][i].notUsed = true;
    }

    this.row++;
  }

  public undo(): void {
    this.guesses.pop();
  }
}

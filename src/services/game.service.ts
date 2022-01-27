import GameInterface from "../interfaces/game.interface";
import GameOptions from "../models/game-options.model";
import GuessState from "../models/guess-state.model";
import SubmitResponse from "../models/submit-response.model";
import HelperUtil from "../utils/helper.util";

export default class GameService implements GameInterface {
  private row = 0;

  constructor() {
    this.options = new GameOptions();
    this.guesses = [...Array(this.options.tries)].map(() => Array(0));
  }

  public guesses: GuessState[][];

  public options: GameOptions;

  public addGuess(guess: string): void {
    if (this.guesses[this.row].length >= this.options.word.length) {
      return;
    }

    this.guesses[this.row].push(new GuessState(guess));
  }

  public submit(): SubmitResponse | void {
    const wordLength = this.options.word.length;
    const guessesLength = this.guesses[this.row].length;

    if (
      guessesLength === 0 ||
      guessesLength % wordLength !== 0 ||
      this.row >= this.options.tries
    ) {
      return;
    }

    const word = this.guesses[this.row].reduce(
      (acc, curr) => `${acc}${curr.character}`,
      ""
    );
    if (!HelperUtil.isWord(word, this.options.lang)) {
      for (let i = 0; i < guessesLength; i++) {
        this.guesses[this.row][i].invalid = true;
      }

      return SubmitResponse.forNotAWord();
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

    if (word === this.options.word) {
      return SubmitResponse.forWon();
    }

    this.row++;

    if (this.row >= this.options.tries) {
      return SubmitResponse.forLost(this.options.word);
    }
  }

  public undo(): void {
    this.guesses[this.row]?.pop();
  }
}

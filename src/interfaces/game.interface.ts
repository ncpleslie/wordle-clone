import GameOptions from "../models/game-options.model";
import GuessState from "../models/guess-state.model";
import SubmitResponse from "../models/submit-response.model";

/**
 * Game provides the business logic on the game application.
 */
export default interface GameInterface {
  /**
   * An entity containing options and configurations for the game.
   */
  options: GameOptions;

  /**
   * An array of all the guesses the user has added so far.
   */
  guesses: GuessState[][];

  /**
   * Add a guess to the array of guesses.
   * @param guess The user-submitted guess.
   */
  addGuess(guess: string): void;

  /**
   * Submit a answer.
   */
  submit(): Promise<SubmitResponse | void>;

  /**
   * Undo a guess.
   */
  undo(): void;
}

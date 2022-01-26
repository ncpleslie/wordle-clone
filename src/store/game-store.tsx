import { makeAutoObservable } from "mobx";
import { KeyboardEventKey } from "../enums/keyboard-event-key.enum";
import GameInterface from "../interfaces/game.interface";
import GameOptions from "../models/game-options.model";
import GuessState from "../models/guess-state.model";
import KeyState from "../models/key-state.model";
import GameService from "../services/game.service";
import HelperUtil from "../utils/helper.util";

/**
 * A MobX store of game state.
 */
class GameStore {
  /**
   * Creates a GameStore MobX store.
   * @param game The game's business logic.
   */
  constructor(game: GameInterface) {
    makeAutoObservable(this);

    this.keyboardState = this.generateKeyboard(game.options.lang);
    this.guesses = [];
    this.game = game;
  }

  /**
   * The game's business logic.
   */
  public game: GameInterface;

  /**
   * An array of currently added guesses.
   */
  public guesses: GuessState[];

  /**
   * The state of the keyboard.
   */
  public keyboardState: { [key: string]: KeyState };

  /**
   * Get a guess from the array of guesses, by index.
   * If no guess of that index is found, an empty GuessState is returned.
   * @param index The index of the guess to retrieve.
   * @returns A GuessState.
   */
  public getGuessByIndex(index: number): GuessState {
    if (this.guesses.length === 0 || this.guesses.length <= index) {
      return new GuessState("");
    }

    return this.guesses[index];
  }

  /**
   * Get the total number of tries the user can have.
   * @returns The total number of tries.
   */
  public getTotalTries(): number {
    return this.game.options.tries;
  }

  /**
   * Get the length of the target word.
   * @returns A length of the word.
   */
  public getWordLength(): number {
    return this.game.options.word.length;
  }

  /**
   * Handle when a key is clicked.
   * @param key The key that was clicked.
   */
  public onKeyClicked(key: string): void {
    if (key === KeyboardEventKey.Enter) {
      this.game.submit();
      this.updateGuessesState();

      this.guesses.forEach((guess: GuessState) => {
        if (guess.usedLocationCorrect) {
          this.setKeyLocationKnown(guess.character);
        }

        if (guess.usedLocationIncorrect) {
          this.setKeyLocationUnknown(guess.character);
        }

        if (guess.notUsed) {
          this.setKeyNotUsed(guess.character);
        }
      });

      this.updateKeyboardState();

      return;
    }

    if (key === KeyboardEventKey.Backspace) {
      this.game.undo();
      this.updateGuessesState();

      return;
    }

    this.game.addGuess(key);
    this.updateGuessesState();
  }

  /**
   * Generates a keyboard in the provided language.
   * @param lang The language for the keyboard.
   * @returns A object of KeyStates. The key of the object is the character of key.
   */
  private generateKeyboard(lang: string): { [key: string]: KeyState } {
    const keyboard = HelperUtil.getKeyboard(lang);

    return keyboard?.reduce<{ [key: string]: KeyState }>((acc, curr) => {
      acc[curr.character.toUpperCase()] = curr;

      return acc;
    }, {});
  }

  /**
   * Sets a key to a "usedLocationKnown" state.
   * @param key The key to set.
   */
  private setKeyLocationKnown(key: string): void {
    this.keyboardState[key].usedLocationKnown = true;
  }

  /**
   * Sets a key to a "usedLocationUnknown" state.
   * @param key The key to set.
   */
  private setKeyLocationUnknown(key: string): void {
    this.keyboardState[key].usedLocationUnknown = true;
  }

  /**
   * Sets a key to a "notUsed" state.
   * @param key The key to set.
   */
  private setKeyNotUsed(key: string): void {
    this.keyboardState[key].notUsed = true;
  }

  /**
   * Update the guesses state so MobX knows to inform observers.
   */
  private updateGuessesState(): void {
    this.guesses = this.game.guesses.flat();
  }

  /**
   * Update the keyboard state so MobX can inform observers.
   */
  private updateKeyboardState(): void {
    this.keyboardState = { ...this.keyboardState };
  }
}

const config = HelperUtil.getConfig();
const word = HelperUtil.getRandomWord(config.wordLength, config.lang);
console.log("Word is: ", word);
const gameOptions = new GameOptions(word, config.tries, config.lang);
const gameService = new GameService(gameOptions);

const store = new GameStore(gameService);

export default store;

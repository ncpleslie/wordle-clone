import { makeAutoObservable } from "mobx";
import { KeyboardEventKey } from "../enums/keyboard-event-key.enum";
import GameInterface from "../interfaces/game.interface";
import GuessState from "../models/guess-state.model";
import KeyState from "../models/key-state.model";
import GameService from "../services/game.service";
import Dictionary from "../types/dictionary.interface";
import HelperUtil from "../utils/helper.util";

/**
 * A MobX store of game state.
 */
class GameStore {
  /**
   * Creates a GameStore MobX store.
   */
  constructor(game: GameInterface) {
    makeAutoObservable(this);

    this.guesses = [];
    this.game = game;
    this.generateKeyboard(this.game.options.lang).then((keyboard) => {
      this.keyboard = keyboard;
    });
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
  public keyboard: Dictionary<KeyState> | undefined;

  /**
   * The message to show in a modal.
   */
  public modalMessage = "";

  /**
   * The modal state.
   */
  public showModal = false;

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
  public async onKeyClicked(key: string): Promise<void> {
    if (key === KeyboardEventKey.Enter) {
      const submitResponse = await this.game.submit();

      if (submitResponse?.error) {
        this.displayModal(submitResponse.error);
      }

      if (submitResponse?.won) {
        this.displayModal(submitResponse.won);
      }

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
  private async generateKeyboard(lang: string): Promise<Dictionary<KeyState>> {
    const keyboard = await HelperUtil.getKeyboard(lang);

    return keyboard?.reduce<Dictionary<KeyState>>((acc, curr) => {
      acc[curr.character.toUpperCase()] = curr;

      return acc;
    }, {});
  }

  /**
   * Sets a key to a "usedLocationKnown" state.
   * @param key The key to set.
   */
  private setKeyLocationKnown(key: string): void {
    if (!this.keyboard) {
      return;
    }

    this.keyboard[key].usedLocationKnown = true;
  }

  /**
   * Sets a key to a "usedLocationUnknown" state.
   * @param key The key to set.
   */
  private setKeyLocationUnknown(key: string): void {
    if (!this.keyboard) {
      return;
    }

    this.keyboard[key].usedLocationUnknown = true;
  }

  /**
   * Sets a key to a "notUsed" state.
   * @param key The key to set.
   */
  private setKeyNotUsed(key: string): void {
    if (!this.keyboard) {
      return;
    }

    this.keyboard[key].notUsed = true;
  }

  /**
   * Shows a modal.
   * @param message The message to display.
   */
  private displayModal(message: string, timeoutInMs = 8000): void {
    this.showModal = true;
    this.modalMessage = message;

    if (this.showModal) {
      setTimeout(() => (this.showModal = false), timeoutInMs);
    }
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
    this.keyboard = { ...this.keyboard };
  }
}

const gameService = await GameService.createGameService();
const store = new GameStore(gameService);

export default store;

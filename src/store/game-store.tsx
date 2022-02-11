import { makeAutoObservable } from "mobx";
import { KeyboardEventKey } from "../enums/keyboard-event-key.enum";
import IGameService from "../interfaces/game.interface";
import Config from "../models/config.model";
import GameOptions from "../models/game-options.model";
import GuessState from "../models/guess-state.model";
import KeyState from "../models/key-state.model";
import SettingsConfig from "../models/settings-config.model";
import GameService from "../services/game.service";
import Dictionary from "../types/dictionary.interface";
import HelperUtil from "../utils/helper.util";

/**
 * A MobX store of game state.
 */
export default class GameStore {
  private timer: NodeJS.Timeout | undefined;

  /**
   * Creates a GameStore MobX store.
   */
  constructor(game: IGameService, keyboard: Dictionary<KeyState>) {
    makeAutoObservable(this);

    this.guesses = [];
    this.game = game;
    this.keyboard = keyboard;
  }

  /**
   * The game's business logic.
   */
  public game: IGameService;

  /**
   * An array of currently added guesses.
   */
  public guesses: GuessState[];

  /**
   * The state of the keyboard.
   */
  public keyboard: Dictionary<KeyState>;

  /**
   * The toast state.
   */
  public showToast = false;

  /**
   * The message to show in a toast.
   */
  public toastMessage = "";

  /**
   * The timeout of the toast message.
   */
  public toastTimeoutInMs = 2500;

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
        this.displayToast(submitResponse.error);
      }

      if (submitResponse?.won) {
        this.displayToast(submitResponse.won);
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
   * Gets the configuration for the settings menu.
   * @returns The settings configuration.
   */
  public async getSettings(): Promise<SettingsConfig> {
    const config = await HelperUtil.getSettingsConfig();
    config.currentWordLength = this.game.options.word.length.toString();
    config.currentTries = this.game.options.tries.toString();
    config.currentLang = this.game.options.lang;

    return config;
  }

  /**
   * Update the current language.
   * @param lang The new language.
   */
  public async setLang(lang: string): Promise<void> {
    const config = new Config(
      this.game.options.word.length,
      this.game.options.tries,
      lang
    );
    await this.updateGameConfig(config);
  }

  /**
   * Update the number of number of guesses the user can make.
   * @param tries The new tries value.
   */
  public async setTries(tries: number): Promise<void> {
    const config = new Config(
      this.game.options.word.length,
      tries,
      this.game.options.lang
    );
    await this.updateGameConfig(config);
  }

  /**
   * Update the word length.
   * @param wordLength The new word length.
   */
  public async setWordLength(wordLength: number): Promise<void> {
    const config = new Config(
      wordLength,
      this.game.options.tries,
      this.game.options.lang
    );
    await this.updateGameConfig(config);
  }

  /**
   * Shows a toast.
   * @param message The message to display.
   */
  private displayToast(message: string, timeoutInMs = 2500): void {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = undefined;
    }

    this.showToast = true;
    this.toastMessage = message;
    this.toastTimeoutInMs = timeoutInMs;

    if (this.showToast) {
      this.timer = setTimeout(() => this.hideToast(), timeoutInMs);
    }
  }

  /**
   * Hide the toast notification.
   */
  private hideToast(): void {
    this.showToast = false;
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
   * Updates the game's configuration.
   * @param config The new config.
   */
  private async updateGameConfig(config: Config): Promise<void> {
    this.game = await GameService.createGameService(config);
    this.keyboard = await HelperUtil.generateKeyboard(this.game.options.lang);
    this.updateGuessesState();
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

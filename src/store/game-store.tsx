import { makeAutoObservable } from "mobx";
import { KeyboardEventKey } from "../enums/keyboard-event-key.enum";
import KeyState from "../models/key-state.model";
import keyboardImporter from "../utils/keyboard-importer";

class GameStore {
  private word = "LEVER";
  private tries = 6;
  private lang = "en-US";

  constructor() {
    makeAutoObservable(this);
    this.keyboardState = this.generateKeyboard(this.lang);
    this.guesses = [];
  }

  public keyboardState: { [key: string]: KeyState };
  public guesses: string[];

  public getWordLength(): number {
    return this.word.length;
  }

  public getTotalTries(): number {
    return this.tries;
  }

  public onKeyClicked(key: string): void {
    if (key === KeyboardEventKey.Enter) {
      this.submit();

      return;
    }

    if (key === KeyboardEventKey.Backspace) {
      this.undo();

      return;
    }

    this.addGuess(key);
    this.setKeyLocationKnown(key);
  }

  private addGuess(guess: string): void {
    if (this.guesses.length >= this.word.length) {
      return;
    }

    this.guesses.push(guess);
    this.updateGuessesState();
  }

  private submit(): void {
    const wordLength = this.word.length;
    const guessesLength = this.guesses.length;

    if (guessesLength !== 0 && guessesLength % wordLength === 0) {
      const row = guessesLength / wordLength - 1;
      const start = row * wordLength;
      const end = wordLength * row + start || wordLength;
      const currentGuess = this.guesses.slice(start, end).join("");

      if (currentGuess === this.word) {
        console.log("winner");
      }
    }
  }

  private undo(): void {
    this.guesses.pop();
    this.updateGuessesState();
  }

  private updateGuessesState(): void {
    this.guesses = this.guesses.slice();
  }

  private setKeyLocationKnown(key: string): void {
    this.keyboardState[key].usedLocationKnown = true;
    this.updateKeyboardState();
  }

  private setKeyLocationUnknown(key: string): void {
    this.keyboardState[key].usedLocationUnknown = true;
    this.updateKeyboardState();
  }

  private updateKeyboardState(): void {
    this.keyboardState = { ...this.keyboardState };
  }

  private generateKeyboard(lang: string): { [key: string]: KeyState } {
    const keyboard = keyboardImporter(lang);

    return keyboard?.reduce<{ [key: string]: KeyState }>((acc, curr) => {
      acc[curr.character] = curr;

      return acc;
    }, {});
  }
}

const store = new GameStore();

export default store;

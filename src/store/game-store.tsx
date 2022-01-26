import { makeAutoObservable } from "mobx";
import { KeyboardEventKey } from "../enums/keyboard-event-key.enum";
import GameOptions from "../models/game-options.model";
import GuessState from "../models/guess-state.model";
import KeyState from "../models/key-state.model";
import GameService from "../services/game.service";
import keyboardImporter from "../utils/keyboard-importer";

class GameStore {
  constructor(game: GameService) {
    makeAutoObservable(this);
    this.keyboardState = this.generateKeyboard(game.options.lang);
    this.guesses = [];
    this.game = game;
  }

  public keyboardState: { [key: string]: KeyState };
  public guesses: GuessState[];
  public game: GameService;

  public getWordLength(): number {
    return this.game.options.word.length;
  }

  public getTotalTries(): number {
    return this.game.options.tries;
  }

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

  private updateGuessesState(): void {
    this.guesses = this.game.getGuesses();
  }

  private setKeyNotUsed(key: string): void {
    this.keyboardState[key].notUsed = true;
  }

  private setKeyLocationKnown(key: string): void {
    this.keyboardState[key].usedLocationKnown = true;
  }

  private setKeyLocationUnknown(key: string): void {
    this.keyboardState[key].usedLocationUnknown = true;
  }

  private updateKeyboardState(): void {
    this.keyboardState = { ...this.keyboardState };
  }

  private generateKeyboard(lang: string): { [key: string]: KeyState } {
    const keyboard = keyboardImporter(lang);

    return keyboard?.reduce<{ [key: string]: KeyState }>((acc, curr) => {
      acc[curr.character.toUpperCase()] = curr;

      return acc;
    }, {});
  }
}

const gameOptions = new GameOptions("ABCDE", 6);
const gameService = new GameService(gameOptions);

const store = new GameStore(gameService);

export default store;

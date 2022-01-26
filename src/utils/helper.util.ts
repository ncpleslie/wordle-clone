import Config from "../models/config.model";
import Dictionary from "../types/dictionary.interface";
import KeyState from "../models/key-state.model";
import config from "./config.json";
import dictionary from "./dictionary.json";
import KeyboardConfig from "./keyboard.json";

/**
 * Various helper utilities functions used by the application.
 */
export default class HelperUtil {
  /**
   * Get the current game configuration.
   * @returns {Config} A config entity.
   */
  public static getConfig(): Config {
    return new Config(config.wordLength, config.tries, config.lang);
  }

  /**
   * Get a keyboard by language.
   * @param lang The language of keyboard to get.
   * @returns {KeyState[]} An array of KeyStates.
   */
  public static getKeyboard(lang: string): KeyState[] {
    const keyboardConfig: {
      [key: string]: { character: string; order: number; row: number }[];
    } = KeyboardConfig;

    return keyboardConfig[lang].map(
      (k: { character: string; order: number; row: number }) =>
        new KeyState(k.character, k.order, k.row)
    );
  }

  /**
   * Get a random word.
   * @param length The length of the word.
   * @param lang The language of the word.
   * @returns {string} A random word.
   */
  public static getRandomWord(length: number, lang: string): string {
    const dictWithLang = (dictionary as Dictionary)[lang];
    const dictLength = dictWithLang[length].length;

    return dictWithLang[length][Math.floor(Math.random() * (dictLength - 0))];
  }

  /**
   * Check if a word is in the dictionary.
   * @param word The word.
   * @param lang The language of the word.
   * @returns {boolean} True if the word is in the dictionary.
   */
  public static isWord(word: string, lang: string): boolean {
    return (dictionary as Dictionary)[lang][word.length.toString()].includes(
      word.toLowerCase()
    );
  }
}

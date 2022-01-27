import Config from "../models/config.model";
import Dictionary, {
  LanguageSpecificDictionary,
} from "../types/dictionary.interface";
import KeyState from "../models/key-state.model";
import config from "./config.json";
import dictionary from "./dictionary.json";

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
  public static async getKeyboard(lang: string): Promise<KeyState[]> {
    const keyboardConfig = await import("./keyboard.json");
    const formattedKeyboardConfig: Dictionary<
      {
        character: string;
        order: number;
        row: number;
        special?: boolean;
      }[]
    > = keyboardConfig.default;
    return formattedKeyboardConfig[lang].map(
      (k: {
        character: string;
        order: number;
        row: number;
        special?: boolean;
      }) => new KeyState(k.character, k.order, k.row, k.special)
    );
  }

  /**
   * Get a random word.
   * @param length The length of the word.
   * @param lang The language of the word.
   * @returns {string} A random word.
   */
  public static getRandomWord(length: number, lang: string): string {
    const dictWithLang = (dictionary as Dictionary<LanguageSpecificDictionary>)[
      lang
    ];
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
    return (dictionary as Dictionary<LanguageSpecificDictionary>)[lang][
      word.length.toString()
    ].includes(word.toLowerCase());
  }
}

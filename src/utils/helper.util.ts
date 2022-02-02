import Config from "../models/config.model";
import Dictionary, {
  LanguageSpecificDictionary,
} from "../types/dictionary.interface";
import KeyState from "../models/key-state.model";
import DomConstant from "../constants/dom.constants";

/**
 * Various helper utilities functions used by the application.
 */
export default class HelperUtil {
  /**
   * Generates a keyboard in the provided language.
   * @param lang The language for the keyboard.
   * @returns A object of KeyStates. The key of the object is the character of key.
   */
  public static async generateKeyboard(
    lang: string
  ): Promise<Dictionary<KeyState>> {
    const keyboard = await HelperUtil.getKeyboard(lang);

    return keyboard?.reduce<Dictionary<KeyState>>((acc, curr) => {
      acc[curr.character.toUpperCase()] = curr;

      return acc;
    }, {});
  }

  /**
   * Get the current game configuration.
   * @returns {Config} A config entity.
   */
  public static async getConfig(): Promise<Config> {
    const config = await import("../config.json");

    return new Config(config.wordLength, config.tries, config.lang);
  }

  /**
   * Get a keyboard by language.
   * @param lang The language of keyboard to get.
   * @returns {KeyState[]} An array of KeyStates.
   */
  public static async getKeyboard(lang: string): Promise<KeyState[]> {
    const keyboardConfig = await import("../keyboard.json");
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
  public static async getRandomWord(
    length: number,
    lang: string
  ): Promise<string> {
    const dictionary = await HelperUtil.getDictionary(lang);
    const dictLength = dictionary[length].length;

    const word =
      dictionary[length][Math.floor(Math.random() * (dictLength - 0))];

    // Check to make sure the word doesn't include any unwanted characters.
    // If it does, retry getting a word.
    //
    // ^: Assert position at the beginning of the string
    // [a-z]: Match a single character present in the list below:
    // +: Between one and unlimited times, as many as possible, giving back as needed (greedy)
    // a-z: A character in the range between "a" and "z"
    // $: Assert position at the end of the string (or before the line break at the end of the string, if any)
    // i: Case-insensitive flag
    if (!/^[a-z]+$/i.test(word)) {
      return HelperUtil.getRandomWord(length, lang);
    }

    return word;
  }

  /**
   * Check if a word is in the dictionary.
   * @param word The word.
   * @param lang The language of the word.
   * @returns {boolean} True if the word is in the dictionary.
   */
  public static async isWord(word: string, lang: string): Promise<boolean> {
    const dictionary = await HelperUtil.getDictionary(lang);

    return dictionary[word.length.toString()].includes(word.toLowerCase());
  }

  /**
   * Removes the loading indicator.
   */
  public static removeLoadingIndicator(): void {
    document.getElementById(DomConstant.loadingElement)?.remove();
  }

  /**
   * Get a dictionary by language.
   * @param lang The language of the dictionary.
   * @returns A language specific dictionary.
   */
  private static async getDictionary(
    lang: string
  ): Promise<LanguageSpecificDictionary> {
    const dictionary = await import("../dictionary.json");

    return (dictionary.default as Dictionary<LanguageSpecificDictionary>)[lang];
  }
}

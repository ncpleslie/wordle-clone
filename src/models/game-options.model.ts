import HelperUtil from "../utils/helper.util";

export default class GameOptions {
  constructor() {
    const config = HelperUtil.getConfig();
    const word = HelperUtil.getRandomWord(config.wordLength, config.lang);
    console.log("Word is: ", word);

    this.word = word.toUpperCase();
    this.tries = config.tries;
    this.lang = config.lang;
  }

  public word: string;
  public tries: number;
  public lang: string;
}

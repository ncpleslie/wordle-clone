export default class GameOptions {
  constructor(word: string, tries = 6, lang = "en-US") {
    this.word = word;
    this.tries = tries;
    this.lang = lang;
  }

  public word: string;
  public tries: number;
  public lang: string;
}

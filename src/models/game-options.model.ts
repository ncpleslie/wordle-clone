export default class GameOptions {
  constructor(word: string, tries: number, lang: string) {
    this.word = word.toUpperCase();
    this.tries = tries;
    this.lang = lang;

    console.log("Word is: ", word);
  }

  public word: string;
  public tries: number;
  public lang: string;
}

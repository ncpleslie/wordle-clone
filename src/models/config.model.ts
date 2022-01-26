export default class Config {
  constructor(wordLength: number, tries: number, lang: string) {
    this.wordLength = wordLength;
    this.tries = tries;
    this.lang = lang;
  }

  public wordLength: number;
  public tries: number;
  public lang: string;
}

export default class Config {
  constructor(
    wordLength?: number | null,
    tries?: number | null,
    lang?: string | null,
    supportedLangs?: string[] | null
  ) {
    this.wordLength = wordLength;
    this.tries = tries;
    this.lang = lang;
    this.supportedLangs = supportedLangs;
  }

  public wordLength: number | undefined | null;
  public tries: number | undefined | null;
  public supportedLangs: string[] | undefined | null;
  public lang: string | undefined | null;
}

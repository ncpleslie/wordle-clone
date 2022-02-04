export default class SettingsConfig {
  constructor(
    wordLengths: string[],
    tries: string[],
    languages: string[],
    currentWordLength?: string,
    currentTries?: string,
    currentLang?: string
  ) {
    this.wordLengths = wordLengths;
    this.tries = tries;
    this.languages = languages;
    this.currentWordLength = currentWordLength;
    this.currentTries = currentTries;
    this.currentLang = currentLang;
  }

  public languages: string[];
  public currentLang: string | undefined;
  public currentWordLength: string | undefined;
  public wordLengths: string[];
  public tries: string[];
  public currentTries: string | undefined;
}

export default class GuessState {
  constructor(character: string) {
    this.character = character;
    this.usedLocationCorrect = false;
    this.usedLocationIncorrect = false;
    this.notUsed = false;
  }

  public character: string;
  public usedLocationCorrect: boolean;
  public usedLocationIncorrect: boolean;
  public notUsed: boolean;
}

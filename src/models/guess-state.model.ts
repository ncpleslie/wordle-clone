export default class GuessState {
  constructor(character: string) {
    this.character = character;
  }

  public character: string;
  public usedLocationCorrect = false;
  public usedLocationIncorrect = false;
  public notUsed = false;
  public invalid = false;
}

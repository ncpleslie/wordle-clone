export default class KeyState {
  constructor(character: string, order: number, row: number) {
    this.character = character;
    this.order = order;
    this.row = row;
    this.usedLocationKnown = false;
    this.usedLocationUnknown = false;
  }

  public character: string;
  public order: number;
  public row: number;
  public usedLocationKnown: boolean;
  public usedLocationUnknown: boolean;
}

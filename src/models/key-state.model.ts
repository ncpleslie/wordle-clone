export default class KeyState {
  constructor(character: string, order: number, row: number, special = false) {
    this.character = character;
    this.order = order;
    this.row = row;
    this.special = special;
    this.usedLocationKnown = false;
    this.usedLocationUnknown = false;
    this.notUsed = false;
  }

  public character: string;
  public order: number;
  public row: number;
  public special: boolean;
  public usedLocationKnown: boolean;
  public usedLocationUnknown: boolean;
  public notUsed: boolean;
}

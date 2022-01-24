import KeyState from "./key-state.model";

export default class KeyboardState {
  constructor(keyboardState?: { [key: string]: KeyState } | KeyState[]) {
    if (Array.isArray(keyboardState)) {
      this.state =
        keyboardState?.reduce<{ [key: string]: KeyState }>((acc, curr) => {
          acc[curr.character] = curr;

          return acc;
        }, {}) || {};

      return;
    }

    this.state = keyboardState as { [key: string]: KeyState };
  }

  public state: { [key: string]: KeyState };

  public setKeyLocationKnown(key: string): void {
    this.state[key].usedLocationKnown = true;
  }

  public setKeyLocationUnknown(key: string): void {
    this.state[key].usedLocationUnknown = true;
  }
}

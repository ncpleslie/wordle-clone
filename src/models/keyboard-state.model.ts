import KeyState from "./key-state.model";

export default class KeyboardState {
  constructor(keyboardState?: KeyState[]) {
    this.state =
      keyboardState?.reduce<{ [key: string]: KeyState }>((acc, curr) => {
        acc[curr.character] = curr;

        return acc;
      }, {}) || {};
  }

  public state: { [key: string]: KeyState };
}

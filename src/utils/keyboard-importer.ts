import KeyState from "../models/key-state.model";
import KeyboardConfig from "./keyboard.json";

const keyboardImporter = (lang: string) => {
  const keyboardConfig: {
    [key: string]: { character: string; order: number; row: number }[];
  } = KeyboardConfig;

  return keyboardConfig[lang].map(
    (k: { character: string; order: number; row: number }) =>
      new KeyState(k.character, k.order, k.row)
  );
};

export default keyboardImporter;

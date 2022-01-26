import dictionary from "./dictionary.json";

const randomWord = (length: number): string => {
  const dict: { [key: string]: string[] } = dictionary;

  const dictLength = dict[length].length;
  return dict[length][Math.floor(Math.random() * (dictLength - 0))];
};

const isWord = (word: string): boolean => {
  const dict: { [key: string]: string[] } = dictionary;
  return dict[word.length.toString()].includes(word.toLowerCase());
};

export { randomWord, isWord };

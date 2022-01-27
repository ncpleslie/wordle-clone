export default interface Dictionary<T> {
  [key: string]: T;
}

export interface LanguageSpecificDictionary {
  [key: string]: string[];
}

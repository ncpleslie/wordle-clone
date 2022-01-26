export default interface Dictionary {
  [key: string]: LanguageSpecificDictionary;
}

export interface LanguageSpecificDictionary {
  [key: string]: string[];
}

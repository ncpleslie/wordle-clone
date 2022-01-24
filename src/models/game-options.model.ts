export default class GameOptions {
    constructor(word?: string, tries?: number) {
        this.word = word || "ERROR";
        this.tries = tries || 6;
    }

    public word: string;
    public tries: number;
}
export default class GameOptions {
    constructor(word: string, tries: number) {
        this.word = word;
        this.tries = tries;
    }

    public word: string;
    public tries: number;
}
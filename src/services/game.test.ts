import GameOptions from "../models/game-options.model";
import SubmitResponse from "../models/submit-response.model";
import GameService from "./game.service";

const mockDictionary = {
  default: {
    "en-US": {
      "5": ["*****", "bbbbb"],
    },
  },
};

describe(GameService, () => {
  let options: GameOptions;
  let gameService: GameService;

  beforeEach(() => {
    options = new GameOptions("*****", 6, "en-US");
    gameService = new GameService(
      options,
      [...Array(options.tries)].map(() => Array(0))
    );
    jest.mock("../dictionary.json", () => mockDictionary);
  });

  it("It can add a guess", () => {
    const guessToAdd = "*";

    gameService.addGuess(guessToAdd);

    expect(gameService.guesses[0][0].character).toBe(guessToAdd);
  });

  it("It can not add more guesses to a row than the length of the word", () => {
    const guessToAdd = "*";
    const guessesToAdd = [...guessToAdd.repeat(options.word.length)];

    guessesToAdd.forEach((character) => {
      gameService.addGuess(character);
    });

    // add one more guess that won't be added.
    gameService.addGuess(guessToAdd);

    expect(gameService.guesses[0].length).toEqual(guessesToAdd.length);
  });

  it("It can undo adding a guess", () => {
    const guessToAdd = "*";
    const expectedLength = 0;

    gameService.addGuess(guessToAdd);
    gameService.undo();

    expect(gameService.guesses[0].length).toEqual(expectedLength);
  });

  it("It can submit a row of guesses and win", async () => {
    const guessToAdd = "*";
    const guessesToAdd = [...guessToAdd.repeat(options.word.length)];
    const expectedResponse = SubmitResponse.forWon();

    guessesToAdd.forEach((character) => {
      gameService.addGuess(character);
    });

    const response = await gameService.submit();

    expect(response).not.toBeUndefined();
    expect(response?.won).toEqual(expectedResponse?.won);
  });

  it("It won't submit a row of guesses if the row is too short", async () => {
    const guessToAdd = "*";
    const guessesToAdd = [...guessToAdd.repeat(options.word.length)];

    guessesToAdd.forEach((character) => {
      gameService.addGuess(character);
    });

    gameService.undo();

    const response = await gameService.submit();

    expect(response).toBeUndefined();
  });

  it("It will tell you that the submitted word is not a word", async () => {
    const guessToAdd = "a";
    const guessesToAdd = [...guessToAdd.repeat(options.word.length)];
    const expectedResponse = SubmitResponse.forNotAWord();

    guessesToAdd.forEach((character) => {
      gameService.addGuess(character);
    });

    const response = await gameService.submit();

    expect(response).not.toBeUndefined();
    expect(response?.error).toEqual(expectedResponse?.error);
  });

  it("It will tell you that you have lost", async () => {
    const guessToAdd = "b";
    const guessesToAdd = [...guessToAdd.repeat(options.word.length)];
    const expectedResponse = SubmitResponse.forLost(options.word);
    const numberOfTries = options.tries;

    let response: SubmitResponse | void;
    for (let i = 0; i < numberOfTries; i++) {
      guessesToAdd.forEach((character) => {
        gameService.addGuess(character);
      });

      response = await gameService.submit();
    }

    expect(response).not.toBeUndefined();
    expect(response?.error).toEqual(expectedResponse?.error);
  });
});

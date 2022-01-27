export default class SubmitResponse {
  public error?: string;
  public won?: string;

  public static forNotAWord(): SubmitResponse {
    return SubmitResponse.createSubmitResponse("Not a word!", true);
  }

  public static forLost(word: string): SubmitResponse {
    return SubmitResponse.createSubmitResponse(word, true);
  }

  public static forWon(): SubmitResponse {
    return SubmitResponse.createSubmitResponse("You win!", false);
  }

  private static createSubmitResponse(
    word: string,
    forError: boolean
  ): SubmitResponse {
    const response = new SubmitResponse();

    if (forError) {
      response.error = word;
    } else {
      response.won = "You win!";
    }

    return response;
  }
}

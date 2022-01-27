export default class SubmitResponse {
  public error?: string;
  public won?: string;

  public static forNotAWord(): SubmitResponse {
    const response = new SubmitResponse();
    response.error = "Not a word";

    return response;
  }

  public static forWon(): SubmitResponse {
    const response = new SubmitResponse();
    response.won = "You win!";

    return response;
  }
}

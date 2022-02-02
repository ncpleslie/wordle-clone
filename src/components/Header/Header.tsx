import AppConstants from "../../constants/app.constants";
import GithubIcon from "../UI/Icon/GithubIcon";

const Header = () => {
  return (
    <nav className="border w-full text-center p-2 shadow grid grid-cols-3 justify-center">
      <h1 className="font-bold col-start-2">Another Wordle Clone</h1>
      <a
        href={AppConstants.sourceCodeUrl}
        className="flex flex-row gap-1 items-center ml-auto"
      >
        <GithubIcon />
        Source Code
      </a>
    </nav>
  );
};

export default Header;

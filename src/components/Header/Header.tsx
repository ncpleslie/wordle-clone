import AppConstants from "../../constants/app.constants";
import GithubIcon from "../UI/Icon/GithubIcon";

const Header = () => {
  return (
    <nav className="border text-center p-1 shadow grid grid-cols-4">
      <h1 className="font-bold col-start-2 w-[200px]">Another Wordle Clone</h1>
      <a href={AppConstants.sourceCodeUrl} className="col-start-4 ml-auto">
        <GithubIcon />
      </a>
    </nav>
  );
};

export default Header;

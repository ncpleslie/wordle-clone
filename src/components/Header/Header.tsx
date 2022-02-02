import AppConstants from "../../constants/app.constants";
import GithubIcon from "../UI/Icon/GithubIcon";

const Header = () => {
  return (
    <nav className="border w-full text-center p-2 shadow grid grid-cols-3 justify-center items-center">
      <h1 className="font-bold col-start-2">Another Wordle Clone</h1>
      <a href={AppConstants.sourceCodeUrl} className=" ml-auto">
        <GithubIcon />
      </a>
    </nav>
  );
};

export default Header;

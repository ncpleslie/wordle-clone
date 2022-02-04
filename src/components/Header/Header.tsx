import { Link, useLocation } from "react-router-dom";
import AppConstants from "../../constants/app.constants";
import { Path } from "../../enums/path.enum";
import GithubIcon from "../UI/Icon/GithubIcon";

const Header = () => {
  const location = useLocation();

  return (
    <nav className="border text-center p-1 shadow grid grid-cols-4">
      <Link
        className="col-start-1"
        to={Path.Settings}
        state={{ background: location }}
      >
        Settings
      </Link>
      <h1 className="font-bold col-start-2 col-span-2">Another Wordle Clone</h1>
      <a href={AppConstants.sourceCodeUrl} className="col-start-4 ml-auto">
        <GithubIcon />
      </a>
    </nav>
  );
};

export default Header;

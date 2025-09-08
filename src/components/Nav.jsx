import LeftBracket from "../components/svgs/Rectangle 2710.svg";
import RightBracket from "../components/svgs/Rectangle 2711.svg";
import { Link, useLocation } from "react-router-dom";

const Nav = () => {
  const location = useLocation();
  const navText =
    location.pathname === "/" || location.pathname === "/testing"
      ? "INTRO"
      : "ANALYSIS";
  const isCameraPage = location.pathname === '/camera';
  return (
    <nav className={isCameraPage ? 'nav--transparent' : ''}>
      <div className="nav__logo--wrapper">
        <Link to="/" className="nav__logo">
          SKINSTRIC
        </Link>
        <img src={LeftBracket} alt="" className="bracket" />
        <p className="intro">{navText}</p>
        <img src={RightBracket} alt="" className="bracket" />
      </div>
      {location.pathname === "/" && (
        <button className="nav__btn">ENTER CODE</button>
      )}
    </nav>
  );
};

export default Nav;

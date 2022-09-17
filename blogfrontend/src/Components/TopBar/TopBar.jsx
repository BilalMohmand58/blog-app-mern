import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../Context/context";
import "./TopBar.scss";

const TopBar = ({ menuOpen, setMenuOpen }) => {
  const { user, dispatch } = useContext(Context);
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className={"topbar " + (menuOpen && "active")}>
      <div className="wrapper">
        <div className="left">
          <Link to="/" className="logo">
            bilal.
          </Link>
        </div>
        <div className="center">
          <div className="centerContainer">
            <ul className="centerList">
              <li>
                <Link to="/" className="centerLink">
                  <i class="fa-sharp fa-solid fa-house"></i>
                </Link>
              </li>

              <li>
                <Link to="/write" className="centerLink">
                  <i class="fa-sharp fa-solid fa-pen-to-square"></i>
                </Link>
              </li>
            </ul>
          </div>

          <span className="centerSearch">
            <input type="text" /> <i class="fa-solid fa-magnifying-glass"></i>
          </span>
          <div className="centerControls">
            {user ? (
              <>
                <Link to="/setting" className="controlLink">
                  <i class="fa-solid fa-gear"></i>
                </Link>
                <Link
                  to="/"
                  className="controlLink logout"
                  onClick={handleLogout}
                >
                  <i class="fa-sharp fa-solid fa-right-from-bracket"></i>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="controlLink">
                  Login
                </Link>
                <Link to="/register" className="controlLink">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="right">
          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <span className="line-1"></span>
            <span className="line-2"></span>
            <span className="line-3"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;

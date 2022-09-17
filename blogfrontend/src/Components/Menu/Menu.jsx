import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Menu.scss";
import { Context } from "../../Context/context";

const Menu = ({ menuOpen, setMenuOpen }) => {
  const { user, dispatch } = useContext(Context);
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className={"menu " + (menuOpen && "active")}>
      <ul>
        <li onClick={() => setMenuOpen(false)}>
          <Link to="/" className="centerLink">
            Home
          </Link>
        </li>

        <li onClick={() => setMenuOpen(false)}>
          <Link to="/write" className="centerLink">
            Write
          </Link>
        </li>

        {user ? (
          <li onClick={() => setMenuOpen(false)}>
            <Link to="/" className="centerLink" onClick={handleLogout}>
              Logout
            </Link>
          </li>
        ) : (
          <>
            <li onClick={() => setMenuOpen(false)}>
              <Link to="/register" className="centerLink">
                Register
              </Link>
            </li>

            <li onClick={() => setMenuOpen(false)}>
              <Link to="/login" className="centerLink">
                Login
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Menu;

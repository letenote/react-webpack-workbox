import React from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router";
// import { useDispatch } from "react-redux";
// import { userLogout } from "../store/redux/auth/auth.action";
import NetflixLogo from './icons/NetflixLogo';

const Navbar = () => {
  // const dispatch = useDispatch();
  const history = useHistory();
  return (
    <nav style={{ marginBottom: 20 }} className={'nav-wrap'}>
      <div className="logo" onClick={() => history.push("/")}>
        <NetflixLogo/>
      </div>
      <div className="nav-menu">
        <NavLink exact activeClassName={"active"} to="/">
          Home
        </NavLink>
        <NavLink exact activeClassName={"active"} to="/film">
          Film
        </NavLink>
        <button
          type="button"
          className="btn btn-danger"
          style={{
            marginLeft: 15,
            cursor: "pointer",
          }}
          onClick={() => {
            history.push("/login")
            // userLogout(dispatch).then(() => history.push("/login"));
          }}
        >
          Login
        </button>
        <button
          type="button"
          className="btn btn-danger"
          style={{
            marginLeft: 15,
            cursor: "pointer",
          }}
          onClick={() => {
            history.push("/user/register")
            // userLogout(dispatch).then(() => history.push("/user/register"));
          }}
        >
          Register
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
import React, { useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import {useHistory} from "react-router-dom";

const NavBar = ({ token,setToken }) => {
    function handleLogout(){
        sessionStorage.removeItem('token');
        setToken(null);

    }
  return (
    <nav className="diskala-nav">
        <Link to='/viewCandidate' className="navbar-brand">
          DISKALA
        </Link>
        <div id="navbarNav">

          {!token && (
            <div className="nav-links">
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>

              <NavLink className="nav-link" to="/signup">
                Signup
              </NavLink>
            </div>
          )}

          {token && (
            <div className="nav-links">
              <NavLink className="nav-link" onClick={handleLogout} to="/">
                Logout
              </NavLink>
              </div>
          )}
        </div>
    </nav>
  );
};

export default NavBar;
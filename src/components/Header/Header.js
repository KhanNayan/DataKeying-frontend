import React from "react";
import { Redirect, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../Redux/Actions/authAction";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function Header() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    <Redirect to="/login" />;
  };

  return (
    <div>
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        {/* Left navbar links */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" data-widget="pushmenu" to="#">
              <i className="fas fa-bars" />
            </Link>
          </li>
        </ul>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown user-menu">
            <Link
              to="#"
              className="nav-link dropdown-toggle"
              data-toggle="dropdown"
            >
              <span className="d-none d-md-inline">
                {" "}
                <AccountCircleIcon /> User Profile
              </span>
            </Link>
            <ul className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
              {/* <li className="user-header bg-primary">
                <p>
                  Alexander Pierce - Web Developer
                  <small>Member since Nov. 2012</small>
                </p>
              </li> */}

              <li className="user-footer">
                <Link to="#" className="btn btn-default btn-flat">
                  Profile
                </Link>
                <Link
                  to="#"
                  className="btn btn-default btn-flat float-right"
                  onClick={handleLogout}
                >
                  Sign out
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}

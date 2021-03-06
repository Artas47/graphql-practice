import React from 'react';
import { Link, useHistory } from 'react-router-dom';

export const NavBar = ({ loggedIn, onLogout }) => {
  const history = useHistory();
  if (loggedIn) {
    return (
      <nav className="navbar">
        <div className="navbar-start">
          <Link className="navbar-item" to="/">
            Home
          </Link>
          <Link className="navbar-item" to="/jobs/new">
            Post Job
          </Link>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className="navbar-item" onClick={() => onLogout(history)}>
            Logout
          </a>
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="navbar">
        <div className="navbar-start">
          <Link className="navbar-item" to="/">
            Home
          </Link>
          <Link className="navbar-item" to="/login">
            Login
          </Link>
        </div>
      </nav>
    );
  }
};

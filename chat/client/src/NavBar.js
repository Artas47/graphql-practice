import React from 'react';

const NavBar = ({ onLogout }) => {
  return (
    <nav className="nabar">
      <div className="navbar-end">
        <button className="button navbar-item" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavBar;

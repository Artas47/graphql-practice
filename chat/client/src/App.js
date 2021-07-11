import React, { useState } from 'react';
import { getLoggedInUser, logout } from './auth';
import Chat from './Chat';
import Login from './Login';
import NavBar from './NavBar';

const App = () => {
  const [loggedUser, setLoggedUser] = useState(getLoggedInUser());

  const handleLogin = (user) => {
    setLoggedUser(user);
  };

  const handleLogout = () => {
    logout();
    setLoggedUser(null);
  };

  if (!loggedUser) {
    return <Login onLogin={handleLogin} />;
  }
  return (
    <div>
      <NavBar onLogout={handleLogout} />
      <Chat user={loggedUser} />
    </div>
  );
};

export default App;

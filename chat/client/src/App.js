import React, { useState } from 'react';
import { getLoggedInUser, logout } from './auth';
import Chat from './Chat';
import Login from './Login';
import NavBar from './NavBar';
import { ApolloProvider } from '@apollo/client';
import client from './graphql/client';

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
    <ApolloProvider client={client}>
      <NavBar onLogout={handleLogout} />
      <Chat user={loggedUser} />
    </ApolloProvider>
  );
};

export default App;

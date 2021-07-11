import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { isLoggedIn, logout } from './auth';
import { CompanyDetail } from './CompanyDetail';
import { LoginForm } from './LoginForm';
import { JobBoard } from './JobBoard';
import { JobDetail } from './JobDetail';
import { JobForm } from './JobForm';
import { NavBar } from './NavBar';

export const App = () => {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());

  const handleLogin = (history) => {
    setLoggedIn(true);
    history.push('/');
  };

  const handleLogout = (history) => {
    logout();
    setLoggedIn(false);
    history.push('/');
  };

  return (
    <Router>
      <div>
        <NavBar loggedIn={loggedIn} onLogout={handleLogout} />
        <section className="section">
          <div className="container">
            <Switch>
              <Route exact path="/" component={JobBoard} />
              <Route path="/companies/:companyId" component={CompanyDetail} />
              <Route exact path="/jobs/new" component={JobForm} />
              <Route path="/jobs/:jobId" component={JobDetail} />
              <Route
                exact
                path="/login"
                render={() => <LoginForm onLogin={handleLogin} />}
              />
            </Switch>
          </div>
        </section>
      </div>
    </Router>
  );
};

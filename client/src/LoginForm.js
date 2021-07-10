import React, { useState } from 'react';
import { login } from './auth';
import { useHistory } from 'react-router';

export const LoginForm = ({ onLogin }) => {
  const history = useHistory();
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    error: false,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleClick = (event) => {
    event.preventDefault();
    const { email, password } = formState;
    login(email, password).then((ok) => {
      if (ok) {
        onLogin(history);
      } else {
        setFormState({ error: true });
      }
    });
  };

  const { email, password, error } = formState;
  return (
    <form>
      <div className="field">
        <label className="label">Email</label>
        <div className="control">
          <input
            className="input"
            type="text"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Password</label>
        <div className="control">
          <input
            className="input"
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="field">
        <p className="help is-danger">{error && 'Invalid credentials'}</p>
        <div className="control">
          <button className="button is-link" onClick={handleClick}>
            Login
          </button>
        </div>
      </div>
    </form>
  );
};

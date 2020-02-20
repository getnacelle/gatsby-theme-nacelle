import React from 'react';
import styled from 'styled-components';

const Form = styled.form`
  padding: 2em 0;
  input {
    margin-bottom: 1em;
    width: 15em;
  }
`;

const EmailLogin = ({
  handleSubmit,
  setEmail,
  setPassword,
  setUserLoginMethod,
  handleRegister,
  isLoading
}) => {
  function registerUser() {
    setUserLoginMethod('email');
    handleRegister();
  }
  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">
          <input
            type="email"
            name="email"
            placeholder="email"
            autoComplete="off"
            onChange={e => setEmail(e.target.value)}
            onBlur={e => setEmail(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          <input
            type="password"
            name="password"
            placeholder="Password"
            minLength="5"
            autoComplete="current-password"
            onChange={e => setPassword(e.target.value)}
            onBlur={e => setPassword(e.target.value)}
          />
        </label>
      </div>
      <div>
        <button
          type="submit"
          onClick={() => setUserLoginMethod('email')}
          onKeyDown={() => setUserLoginMethod('email')}
          disabled={isLoading}
        >
          Log In
        </button>
      </div>
      <div>
        <button
          type="button"
          onClick={registerUser}
          onKeyDown={registerUser}
          disabled={isLoading}
        >
          Register
        </button>
      </div>
    </Form>
  );
};

export default EmailLogin;

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
  setFirstName,
  setLastName,
  handleRegister
}) => (
  <Form onSubmit={handleSubmit}>
    <div>
      <label htmlFor="email">
        <input
          type="email"
          name="email"
          placeholder="email"
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
          onChange={e => setPassword(e.target.value)}
          onBlur={e => setPassword(e.target.value)}
        />
      </label>
    </div>
    <div>
      <button
        type="submit"
        onClick={setUserLoginMethod('email')}
        onKeyDown={setUserLoginMethod('email')}
      >
        Log In
      </button>
    </div>
  </Form>
);

export default EmailLogin;

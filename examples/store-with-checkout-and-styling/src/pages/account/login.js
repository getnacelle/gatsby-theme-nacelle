import React, { useState } from 'react';
import styled from 'styled-components';
import Layout from 'src/components/Layout';
import axios from 'axios';
import Multipassify from 'multipassify';

const accountClient = axios.create({
  baseURL: `https://${process.env.GATSBY_MYSHOPIFY_DOMAIN}/api/2020-01/graphql`,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Shopify-Storefront-Access-Token': process.env.GATSBY_SHOPIFY_GRAPHQL_TOKEN
  }
});

const multipassify = new Multipassify(process.env.GATSBY_SHOPIFY_MULTIPASS_SECRET);

const Form = styled.form`
  padding: 2em 1em;
  input {
    margin-bottom: 1em;
    width: 15em;
  }
`;

const Login = () => {
  const message = 'Login Page';
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = e => {
    e.preventDefault();
    // console.log('Submitted');
    console.log(username)
    console.log(password)
  };
  return (
    <Layout>
      <h1>{message}</h1>
      <Form onSubmit={handleSubmit}>
        <div>
          <label>
            <input type="text" name="username" placeholder="Username" onChange={e => setUsername(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            <input type="text" name="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
          </label>
        </div>
        <button type="submit">Log In</button>
      </Form>
    </Layout>
  );
};

export default Login;

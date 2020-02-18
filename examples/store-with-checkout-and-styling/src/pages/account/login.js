import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Multipassify from 'multipassify';
import { useSelector, useDispatch } from 'react-redux';
import { Layout } from 'src/components';
import {
  CUSTOMER_ACCESS_TOKEN_CREATE,
  GET_CUSTOMER
} from 'src/queries/account';
import {
  setCustomer,
  setCustomerAccessToken,
  setUserErrors
} from 'src/state/user-actions';

const accountClient = axios.create({
  baseURL: `https://${process.env.GATSBY_MYSHOPIFY_DOMAIN}/api/2020-01/graphql`,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Shopify-Storefront-Access-Token':
      process.env.GATSBY_SHOPIFY_GRAPHQL_TOKEN
  }
});

const multipassify = new Multipassify(
  process.env.GATSBY_SHOPIFY_MULTIPASS_SECRET
);

const Form = styled.form`
  padding: 2em 1em;
  input {
    margin-bottom: 1em;
    width: 15em;
  }
`;

const Login = () => {
  const message = 'Login Page';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const customer = useSelector(state => state.user.customer);
  async function fetchCustomer(customerAccessToken) {
    try {
      const query = GET_CUSTOMER;
      const variables = {
        customerAccessToken: customerAccessToken.accessToken
      };
      const response = await accountClient.post(null, { query, variables });
      const { data } = response.data;
      if (data.customer) {
        dispatch(setCustomer(data.customer));
      }
      if (data.userErrors) {
        dispatch(setUserErrors(data.userErrors));
      }
    } catch (error) {
      throw new Error(error);
    }
  }
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const query = CUSTOMER_ACCESS_TOKEN_CREATE;
      const variables = { input: { email, password } };
      const response = await accountClient.post(null, { query, variables });
      const {
        customerAccessToken,
        userErrors
      } = response.data.data.customerAccessTokenCreate;
      if (customerAccessToken) {
        dispatch(setCustomerAccessToken(customerAccessToken));
        await fetchCustomer(customerAccessToken);
      }
      if (userErrors.length > 0) {
        dispatch(setUserErrors(userErrors));
      }
      const inBrowser = window !== 'undefined';
      const { protocol, host } = inBrowser
        ? window.location
        : { protocol: null, host: null };
      const multipassifyArgs = inBrowser
        ? {
            ...customer,
            return_to: `${protocol}//${host}/account`
          }
        : customer;
      const multipassUrl = multipassify.generateUrl(
        multipassifyArgs,
        process.env.GATSBY_MYSHOPIFY_DOMAIN
      );
      if (multipassUrl && inBrowser) {
        window.location = multipassUrl;
      }
    } catch (error) {
      throw new Error(error);
    }
  };
  return (
    <Layout>
      <h1>{message}</h1>
      <Form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">
            <input
              type="email"
              name="email"
              placeholder="email"
              onChange={e => setEmail(e.target.value)}
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
            />
          </label>
        </div>
        <button type="submit">Log In</button>
      </Form>
    </Layout>
  );
};

export default Login;

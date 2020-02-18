import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { navigate } from 'gatsby';
import styled from 'styled-components';
import { Layout } from 'src/components';
import axios from 'axios';
import Multipassify from 'multipassify';
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
      console.log(JSON.stringify(response));
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
      const multipassUrl = multipassify.generateUrl(
        { ...customer, return_to: '/account' },
        process.env.GATSBY_MYSHOPIFY_DOMAIN
      );
      console.log(multipassUrl);
      if (multipassUrl) {
        navigate(response.multipassUrl);
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

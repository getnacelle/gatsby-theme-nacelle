import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Layout, EmailLogin, FacebookLogin } from 'src/components';
import { accountClient, multipassify } from 'src/util';
import {
  CUSTOMER_ACCESS_TOKEN_CREATE,
  CUSTOMER_CREATE,
  GET_CUSTOMER
} from 'src/queries/account';
import {
  setCustomer,
  setCustomerAccessToken,
  setUserErrors,
  setLoginMethod
} from 'src/state/user-actions';

const PageLayout = styled.div`
  padding: 0 1em;
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userLoginMethod, setUserLoginMethod] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [shouldSubmitOnUpdate, setshouldSubmitOnUpdate] = useState(false);
  const [customerCreateCount, setCustomerCreateCount] = useState(0);
  const dispatch = useDispatch();
  const customer = useSelector(state => state.user.customer);

  const fetchCustomer = useCallback(
    async customerAccessToken => {
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
        if (data.userErrors && data.userErrors.length > 0) {
          dispatch(setUserErrors(...data.userErrors));
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    [dispatch]
  );

  const multipassLogin = useCallback(async () => {
    try {
      if (!email) {
        throw new Error('Email is empty');
      }
      const query = CUSTOMER_ACCESS_TOKEN_CREATE;
      const variables = {
        input: { email, password }
      };
      console.log(`Submitted Varibles:\n ${JSON.stringify(variables)}`);
      const response = await accountClient.post(null, { query, variables });
      const {
        customerAccessToken,
        userErrors
      } = response.data.data.customerAccessTokenCreate;
      if (customerAccessToken) {
        dispatch(setCustomerAccessToken(customerAccessToken));
        await fetchCustomer(customerAccessToken);
      }
      if (userErrors && userErrors.length > 0) {
        if (userErrors[0].message === 'Unidentified customer') {
          if (customerCreateCount <= 1) {
            await handleRegister();
            return;
          }
          return new Error('too many attempts to create a new customer.');
        }
        console.log('User Errors:');
        console.log(JSON.stringify(userErrors));
        dispatch(setUserErrors(userErrors));
      }
      const inBrowser = window !== 'undefined';
      const { protocol, host } = inBrowser
        ? window.location
        : { protocol: null, host: null };
      const multipassifyArgs = inBrowser
        ? {
            ...customer,
            email,
            return_to: `${protocol}//${host}/account`
          }
        : { ...customer, email };
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
  }, [
    customer,
    customerCreateCount,
    dispatch,
    email,
    fetchCustomer,
    handleRegister,
    password
  ]);

  const handleRegister = useCallback(
    async event => {
      if (event) {
        event.preventDefault();
      }
      try {
        const variables = { input: { firstName, lastName, email, password } };
        const query = CUSTOMER_CREATE;
        const response = await accountClient.post(null, { query, variables });
        const { data, errors } = response.data;
        if (errors && errors.length) {
          throw new Error(JSON.stringify(errors));
        }
        const { customerUserErrors } = data.customerCreate;
        if (customerUserErrors && customerUserErrors.length > 0) {
          dispatch(setUserErrors(...customerUserErrors));
        } else {
          setCustomerCreateCount(count => count + 1);
          await multipassLogin();
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    [dispatch, email, firstName, lastName, multipassLogin, password]
  );

  const handleSubmit = useCallback(
    async event => {
      if (event) {
        event.preventDefault();
      }
      if (email) {
        await multipassLogin();
      } else {
        setshouldSubmitOnUpdate(true);
      }
    },
    [email, multipassLogin]
  );

  useEffect(() => {
    dispatch(setLoginMethod(userLoginMethod));
  }, [dispatch, userLoginMethod]);

  useEffect(() => {
    async function loginOnUpdate() {
      if (shouldSubmitOnUpdate) {
        await multipassLogin();
      }
    }
    loginOnUpdate();
  }, [shouldSubmitOnUpdate, multipassLogin]);

  return (
    <Layout>
      <PageLayout>
        <h1>Login Page</h1>
        <EmailLogin
          handleSubmit={handleSubmit}
          setEmail={setEmail}
          setPassword={setPassword}
          setUserLoginMethod={setUserLoginMethod}
          setFirstName={setFirstName}
          setLastName={setLastName}
          handleRegister={handleRegister}
        />
        <FacebookLogin
          handleSubmit={handleSubmit}
          setEmail={setEmail}
          setPassword={setPassword}
          setUserLoginMethod={setUserLoginMethod}
          setFirstName={setFirstName}
          setLastName={setLastName}
          handleRegister={handleRegister}
        />
      </PageLayout>
    </Layout>
  );
};

export default Login;

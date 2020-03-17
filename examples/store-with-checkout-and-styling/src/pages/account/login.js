import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Layout, EmailLogin, FacebookLogin } from 'src/components';
import { accountClient, multipassify } from 'src/util';
import {
  CUSTOMER_ACCESS_TOKEN_CREATE,
  CUSTOMER_ACCESS_TOKEN_CREATE_WITH_MULTIPASS,
  CUSTOMER_CREATE,
  CUSTOMER_UPDATE,
  GET_CUSTOMER,
  GET_CUSTOMER_ADDRESSES
} from 'src/queries/account';
import {
  setCustomer,
  setCustomerAccessToken,
  setUserErrors,
  setLoginMethod,
  setCustomerAddresses
} from 'src/state/user-actions';

const PageLayout = styled.div`
  padding: 0 1em;
  h3 {
    margin-top: 1em;
  }
`;

const LoginOptions = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 2em;
  div {
    padding-right: 4em;
  }
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userLoginMethod, setUserLoginMethod] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [shouldSubmitOnUpdate, setshouldSubmitOnUpdate] = useState(false);
  const [needsToRegister, setNeedsToRegister] = useState(false);
  const [needsToLogin, setNeedsToLogin] = useState(false);
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
        setIsLoading(false);
        const { data } = response.data;
        const { userErrors } = data;
        if (data.customer) {
          dispatch(setCustomer(data.customer));
        }
        if (userErrors && userErrors.length > 0) {
          dispatch(setUserErrors({ userErrors: userErrors[0] }));
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    [dispatch]
  );

  const fetchAdresses = useCallback(
    async customerAccessToken => {
      try {
        const variables = {
          customerAccessToken: customerAccessToken.accessToken
        };
        console.log(`Variables: ${JSON.stringify(variables)}`);
        const query = GET_CUSTOMER_ADDRESSES;
        const response = await accountClient.post(null, { query, variables });
        const { data } = response.data;
        if (data.customer) {
          dispatch(
            setCustomerAddresses({
              customerAddresses: data.customer.addresses.edges
            })
          );
        }
        if (data.userErrors && data.userErrors.length > 0) {
          dispatch(setUserErrors({ userErrors: data.userErrors[0] }));
          throw new Error(JSON.stringify(data.userErrors));
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    [dispatch]
  );

  const exchangeMultipassForAccessToken = useCallback(async () => {
    try {
      const inBrowser = window !== 'undefined';
      const { protocol, host } = inBrowser
        ? window.location
        : { protocol: null, host: null };
      const customerData = {
        ...customer,
        email,
        return_to: `${protocol}//${host}/account`
      };
      const multipassToken = multipassify.encode(customerData);
      const variables = { multipassToken };
      const query = CUSTOMER_ACCESS_TOKEN_CREATE_WITH_MULTIPASS;
      const response = await accountClient.post(null, { query, variables });
      setIsLoading(false);
      const { data, errors } = response.data;
      if (errors && errors.length) {
        throw new Error(JSON.stringify(errors));
      }
      const {
        customerAccessToken,
        customerUserErrors
      } = data.customerAccessTokenCreateWithMultipass;
      if (customerAccessToken) {
        return customerAccessToken;
      }
      if (customerUserErrors && customerUserErrors.length > 0) {
        dispatch(setUserErrors({ userErrors: customerUserErrors[0] }));
        throw new Error(JSON.stringify(customerUserErrors));
      }
    } catch (error) {
      throw new Error(error);
    }
  }, [customer, dispatch, email]);

  const multipassLogin = useCallback(async () => {
    try {
      if (!email) {
        throw new Error('Email is empty');
      }
      const inBrowser = window !== 'undefined';
      const { protocol, host } = inBrowser
        ? window.location
        : { protocol: null, host: null };
      const customerData = {
        ...customer,
        email,
        return_to: `${protocol}//${host}/account`
      };
      const multipassifyArgs = inBrowser
        ? customerData
        : { ...customer, email };
      let customerAccessToken;
      let userErrors;
      if (userLoginMethod === 'email') {
        const query = CUSTOMER_ACCESS_TOKEN_CREATE;
        const variables = {
          input: { email, password }
        };
        console.log(`Submitted Varibles:\n ${JSON.stringify(variables)}`);
        const response = await accountClient.post(null, { query, variables });
        setIsLoading(false);
        customerAccessToken =
          response.data.data.customerAccessTokenCreate.customerAccessToken;
        userErrors = response.data.data.customerAccessTokenCreate.userErrors;
        if (userErrors && userErrors.length > 0) {
          console.log('User Errors:');
          console.log(JSON.stringify(userErrors));
          dispatch(setUserErrors({ userErrors: userErrors[0] }));
          if (userErrors[0].message === 'Unidentified customer') {
            setAlertMessage(
              `No account exists for this email address. To register, select Register.`
            );
            return;
          }
        }
      } else if (['social', 'facebook', 'google'].indexOf(userLoginMethod)) {
        customerAccessToken = await exchangeMultipassForAccessToken();
      } else {
        throw new Error('User login method not set.');
      }
      if (customerAccessToken) {
        dispatch(setCustomerAccessToken(customerAccessToken));
        await fetchCustomer(customerAccessToken);
        await fetchAdresses(customerAccessToken);
        setIsLoading(false);
      } else {
        throw new Error(`Multipass token could not be exchanged for customer
        access token`);
      }
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
    dispatch,
    email,
    exchangeMultipassForAccessToken,
    fetchAdresses,
    fetchCustomer,
    password,
    userLoginMethod
  ]);

  const handleRegister = useCallback(
    async event => {
      if (event) {
        event.preventDefault();
      }
      if (customerCreateCount > 3) {
        throw new Error(
          'Maximum registration accounts exceeded. Please refresh.'
        );
      }
      try {
        setIsLoading(true);
        const variables =
          userLoginMethod === 'email'
            ? { input: { firstName, lastName, email, password } }
            : { input: { firstName, lastName, email } };
        const query = CUSTOMER_CREATE;
        console.log(`Registering new user:\n${JSON.stringify(variables)}`);
        if (!email) {
          throw new Error('No email provided during registration step');
        }
        const response = await accountClient.post(null, { query, variables });
        setIsLoading(false);
        const { data, errors } = response.data;
        if (errors && errors.length > 0) {
          throw new Error(JSON.stringify(errors));
        }
        const { customerUserErrors } = data.customerCreate;
        console.log(JSON.stringify(customerUserErrors));
        if (customerUserErrors && customerUserErrors.length > 0) {
          dispatch(setUserErrors({ userErrors: customerUserErrors[0] }));
          console.log(JSON.stringify(customerUserErrors));
          if (customerUserErrors[0].code === 'TOO_SHORT') {
            setAlertMessage(customerUserErrors[0].message);
          }
          if (customerUserErrors[0].code === 'TAKEN') {
            setAlertMessage(
              'There is already an account associated with this email address.'
            );
          }
        } else {
          setCustomerCreateCount(count => count + 1);
          setNeedsToRegister(false);
          setNeedsToLogin(true);
          console.log(`Registered as: ${firstName} ${lastName}`);
        }
      } catch (error) {
        if (error.message.includes('Creating Customer Limit exceeded')) {
          setAlertMessage(
            'There is already an account associated with this email address.'
          );
        } else {
          throw new Error(error);
        }
      }
    },
    [
      customerCreateCount,
      dispatch,
      email,
      firstName,
      lastName,
      password,
      userLoginMethod
    ]
  );

  const handleSubmit = useCallback(
    async event => {
      if (event) {
        event.preventDefault();
      }
      if (email) {
        setIsLoading(true);
        await multipassLogin();
      } else {
        setshouldSubmitOnUpdate(true);
      }
    },
    [email, multipassLogin]
  );

  useEffect(() => {
    if (needsToRegister) {
      handleRegister();
    }
  }, [handleRegister, needsToRegister]);

  useEffect(() => {
    if (needsToLogin) {
      multipassLogin();
    }
  }, [multipassLogin, needsToLogin]);

  useEffect(() => {
    dispatch(setLoginMethod({ userLoginMethod }));
  }, [dispatch, userLoginMethod]);

  useEffect(() => {
    async function loginOnUpdate() {
      if (shouldSubmitOnUpdate) {
        setIsLoading(true);
        await multipassLogin();
      }
    }
    loginOnUpdate();
  }, [shouldSubmitOnUpdate, multipassLogin]);

  return (
    <Layout>
      <PageLayout>
        <h1>Account Login</h1>
        {alertMessage && <p>{alertMessage}</p>}
        <LoginOptions>
          <div>
            <h3>With Email</h3>
            <EmailLogin
              handleSubmit={handleSubmit}
              setEmail={setEmail}
              setPassword={setPassword}
              setUserLoginMethod={setUserLoginMethod}
              handleRegister={handleRegister}
              isLoading={isLoading}
            />
          </div>
          <div>
            <h3>With Social Media</h3>
            <FacebookLogin
              handleSubmit={handleSubmit}
              setEmail={setEmail}
              setPassword={setPassword}
              setUserLoginMethod={setUserLoginMethod}
              setFirstName={setFirstName}
              setLastName={setLastName}
              isLoading={isLoading}
            />
          </div>
        </LoginOptions>
      </PageLayout>
    </Layout>
  );
};

export default Login;

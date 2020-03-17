import React, { useState, useEffect, useCallback } from 'react';
import { Link, navigate } from 'gatsby';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Layout } from 'src/components';
import { accountClient, multipassify } from 'src/util';
import {
  CUSTOMER_ACCESS_TOKEN_CREATE,
  CUSTOMER_CREATE,
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
`;

const Form = styled.form`
  input {
    margin-bottom: 1em;
    width: 15em;
  }
  button {
    cursor: pointer;
  }
  span {
    margin-left: 1em;
  }
  a {
    text-decoration: none;
    color: blue;
  }
`;

const RegisterWithEmail = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
        const variables = { input: { firstName, lastName, email, password } };
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
          navigate('/account/login');
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
    [customerCreateCount, dispatch, email, firstName, lastName, password]
  );

  // const handleSubmit = useCallback(
  //   async event => {
  //     if (event) {
  //       event.preventDefault();
  //     }
  //     if (email) {
  //       setIsLoading(true);
  //       await multipassLogin();
  //     } else {
  //       setshouldSubmitOnUpdate(true);
  //     }
  //   },
  //   [email, multipassLogin]
  // );

  // useEffect(() => {
  //   if (needsToRegister) {
  //     handleRegister();
  //   }
  // }, [handleRegister, needsToRegister]);

  useEffect(() => {
    dispatch(setLoginMethod({ userLoginMethod: 'email' }));
  }, [dispatch]);

  return (
    <Layout>
      <PageLayout>
        <h1>Register</h1>
        {alertMessage && <p>{alertMessage}</p>}
        <Form>
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
                placeholder="password"
                minLength="5"
                autoComplete="current-password"
                onChange={e => setPassword(e.target.value)}
                onBlur={e => setPassword(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label htmlFor="firstName">
              <input
                type="text"
                name="firstName"
                placeholder="first name"
                autoComplete="off"
                onChange={e => setFirstName(e.target.value)}
                onBlur={e => setFirstName(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label htmlFor="lastName">
              <input
                type="text"
                name="lastName"
                placeholder="last name"
                autoComplete="off"
                onChange={e => setLastName(e.target.value)}
                onBlur={e => setLastName(e.target.value)}
              />
            </label>
          </div>
          <div>
            <button
              type="button"
              onClick={handleRegister}
              onKeyDown={handleRegister}
              disabled={isLoading}
            >
              Register
            </button>
          </div>
        </Form>
        <div>
          <Link to="/account/login">Return to Login</Link>
        </div>
      </PageLayout>
    </Layout>
  );
};

export default RegisterWithEmail;

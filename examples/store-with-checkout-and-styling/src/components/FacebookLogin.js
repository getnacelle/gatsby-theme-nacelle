/* global FB */
import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import FacebookClient from 'src/components/FacebookClient';

const FacebookButton = styled.button`
  font-family: Helvetica, Arial, sans-serif;
  cursor: pointer;
  color: ${({ disabled }) => (disabled ? '#1878f3' : 'white')};
  background-color: ${({ disabled }) => (disabled ? 'grey' : '#1878f3')};
  font-size: 13pt;
  font-weight: bold;
  width: 16em;
  border: 1px solid #1878f3;
  border-radius: 4px;
  padding: 0.35em;
  margin-bottom: 0.5em;
`;

const FacebookLogin = ({
  handleSubmit,
  setEmail,
  setUserLoginMethod,
  setFirstName,
  setLastName,
  isLoading
}) => {
  const [isLoggedInWithFacebook, setIsLoggedInWithFacebook] = useState(false);
  const [facebookAvailable, setFacebookAvailable] = useState(false);
  const [loadingCount, setLoadingCount] = useState(0);
  const customer = useSelector(state => state.user.customer);
  const buttonText = isLoggedInWithFacebook
    ? 'Logout'
    : 'Continue with Facebook';

  function updateLoginStatus() {
    return new Promise(resolve => {
      FB.getLoginStatus(function(response) {
        const { status } = response;
        const isLoggedIn = status === 'connected';
        setIsLoggedInWithFacebook(isLoggedIn);
        resolve();
      });
    });
  }

  function getUser() {
    return new Promise(function(resolve, reject) {
      FB.api(
        '/me',
        'GET',
        { fields: 'id,first_name,last_name,email' },
        function(response) {
          // eslint-disable-next-line camelcase
          const { email, id, first_name, last_name } = response;
          if (email) {
            setEmail(email);
            setFirstName(first_name);
            setLastName(last_name);
            resolve({ email, id, first_name, last_name });
          } else {
            reject(new Error('No email address was returned from Facebook'));
          }
        }
      );
    });
  }

  function login() {
    return new Promise((resolve, reject) => {
      FB.login(
        async function(response) {
          if (response.authResponse) {
            try {
              await getUser();
              await updateLoginStatus();
              handleSubmit();
              resolve();
            } catch (error) {
              throw new Error(error);
            }
          } else {
            reject(
              new Error('User cancelled login or did not fully authorize.')
            );
          }
        },
        { scope: 'public_profile,email' }
      );
    });
  }

  const logout = useCallback(
    () =>
      new Promise(resolve => {
        FB.logout();
        updateLoginStatus().then(() => resolve());
      }),
    []
  );

  async function handlePress() {
    if (!isLoggedInWithFacebook) {
      setUserLoginMethod('facebook');
      await login();
    } else {
      await logout();
    }
  }

  useEffect(() => {
    const facebookLoaded = typeof FB !== 'undefined';
    if (!facebookLoaded) {
      setFacebookAvailable(false);
    } else {
      setFacebookAvailable(true);
    }
  }, []);

  useEffect(() => {
    if (facebookAvailable && !isLoading) {
      updateLoginStatus().then(() => {
        if (!customer && isLoggedInWithFacebook) {
          logout();
        }
      });
    }
  }, [customer, facebookAvailable, isLoading, isLoggedInWithFacebook, logout]);

  useEffect(() => {
    if (isLoading) {
      setLoadingCount(x => x + 1);
    }
  }, [isLoading]);

  return (
    <>
      <FacebookClient />
      <FacebookButton
        type="button"
        onClick={handlePress}
        onKeyDown={handlePress}
        tabIndex={0}
        disabled={loadingCount || !facebookAvailable}
      >
        {loadingCount ? 'Loading...' : buttonText}
      </FacebookButton>
      <div id="fb-root" />
    </>
  );
};

export default FacebookLogin;

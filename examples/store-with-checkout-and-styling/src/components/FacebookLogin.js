/* global FB */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import FacebookClient from 'src/components/FacebookClient';

const FacebookButton = styled.button`
  font-family: Helvetica, Arial, sans-serif;
  cursor: pointer;
  color: white;
  background-color: #1878f3;
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
  setPassword,
  setUserLoginMethod,
  setFirstName,
  setLastName,
  handleRegister
}) => {
  const [isLoggedInWithFacebook, setIsLoggedInWithFacebook] = useState(false);
  const [facebookAvailable, setFacebookAvailable] = useState(false);
  const buttonText = isLoggedInWithFacebook
    ? 'Logout'
    : 'Continue with Facebook';

  const facebookLoaded = typeof FB !== 'undefined';
  const pollSdk = setInterval(() => {
    if (facebookLoaded) {
      setFacebookAvailable(true);
      // FB.XFBML.parse();
      clearInterval(pollSdk);
    }
  }, 5);

  function updateLoginStatus() {
    FB.getLoginStatus(function(response) {
      const { status } = response;
      const isLoggedIn = status === 'connected';
      console.log('Login status:');
      console.log(JSON.stringify(status));
      setIsLoggedInWithFacebook(isLoggedIn);
    });
  }

  useEffect(() => {
    if (facebookAvailable) {
      console.log('Facebook is available');
      updateLoginStatus();
    }
  }, [facebookAvailable]);

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
            console.log(`Setting email to: ${email}`);
            setEmail(email);
            setPassword(id);
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
    FB.login(
      function(_response) {
        getUser().then(() => {
          updateLoginStatus();
          handleSubmit();
        });
      },
      { scope: 'public_profile,email' }
    );
  }

  function logout() {
    FB.logout();
    updateLoginStatus();
  }

  function handlePress() {
    if (!isLoggedInWithFacebook) {
      setUserLoginMethod('facebook');
      login();
    } else {
      logout();
    }
  }

  return (
    <>
      <FacebookClient />
      <FacebookButton
        type="button"
        onClick={handlePress}
        onKeyDown={handlePress}
        tabIndex={0}
        disabled={!facebookAvailable}
      >
        {buttonText}
      </FacebookButton>
      <div id="fb-root" />
    </>
  );
};

export default FacebookLogin;
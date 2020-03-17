import React from 'react';
import { Helmet } from 'react-helmet';

const FacebookClient = () => (
  <Helmet>
    <script>{`
      window.fbAsyncInit = function() {
        FB.init({
          appId            : ${process.env.GATSBY_FACEBOOK_APP_ID},
          autoLogAppEvents : true,
          xfbml            : true,
          version          : 'v6.0'
        });
      };
      `}</script>
    <script
      async
      defer
      crossOrigin="anonymous"
      src={`https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v6.0&appId=${process.env.GATSBY_FACEBOOK_APP_ID}`}
    />
  </Helmet>
);

export default FacebookClient;

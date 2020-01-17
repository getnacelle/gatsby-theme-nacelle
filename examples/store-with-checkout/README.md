<p align="center">
  <a href="https://www.getnacelle.com">
    <img alt="Gatsby" src="https://www.gatsbyjs.org/monogram.svg" width="60" />
    <img alt="Nacelle" src="https://raw.githubusercontent.com/getnacelle/gatsby-theme-nacelle/master/examples/store-with-checkout/src/images/nacelle-rocket-icon-crop.png" width="60" />
  </a>
</p>

[![Netlify Status](https://api.netlify.com/api/v1/badges/eea79857-e8bd-4832-87a4-ca398782251f/deploy-status)](https://app.netlify.com/sites/affectionate-sinoussi-2c533e/deploys)

# Demo Store for Gatsby-Theme-Nacelle

A very basic, spartanly-styled Gatsby site which uses `gatsby-theme-nacelle` to build a storefront with checkout. This site demonstrates the use of `gatsby-node.js` to programatically build pages for products and collections, and uses a cart system connected to Redux with a checkout feature powered by Nacelle's Hail Frequency API.

Check out the deploy [here](https://affectionate-sinoussi-2c533e.netlify.com/).

## What is Nacelle?

Nacelle is a headless eCommerce platform made for developers who want to create superior customer buying experiences. When you connect your Shopify, Magento, or custom eCommerce store to Nacelle, our proprietary indexing system supplies a high-performance connection to your back end.

To learn more, check out our [docs](https://docs.getnacelle.com/intro.html#what-is-nacelle).

## Why Redux?

While it would be feasible to manage this store's global state with the React Context API and React Hooks, Redux helps you to scale your application in an organized way as your state tree grows in complexity.

This example site uses the Hooks API for `react-redux`, which makes it easy to read global state and dispatch actions from any component without the use of higher-order components (HOCs). State is preserved between browser refreshes with the help of Redux middleware for local storage. We recommend using the Redux Devtools for Chrome or Firefox in order to get access to time-traveling, state charts, and other handy state inspection features.

## Quick Start

To run this locally, you'll need to first [create a Nacelle account](https://dashboard.getnacelle.com/) and follow the [directions](https://docs.getnacelle.com/getting-started.html#configure-your-shopify-account) for connecting a Shopify store. Once your store is connected, copy the `Space ID` and `Token` values from your Space Settings in the [Nacelle Dashboard]((https://dashboard.getnacelle.com/).

Next, we'll use these as environment variables. Create a `.env` file in the root of the `store-with-checkout` project with the following values:

```dotenv
NACELLE_GRAPHQL_TOKEN="your-token-goes-here"
NACELLE_SPACE_ID="your-space-id-goes-here"
GATSBY_NACELLE_GRAPHQL_TOKEN="your-token-goes-here"
GATSBY_NACELLE_SPACE_ID="your-space-id-goes-here"
```

Unlike the `product-gallery` example, this example project requires the use of `GATSBY_*` environment variables because we're using those variables to make client-side queries to the Nacelle Hail Frequency GraphQL API. You can read more about client-side environment variables in  the [Gatsby docs](https://www.gatsbyjs.org/docs/environment-variables/#client-side-javascript).

Lastly, clone this repository and navigate to `examples/store-with-checkout`, then install with Yarn or NPM.

You're ready to go! Get started with your favorite package manager:

#### With Yarn

```shell
yarn develop
```

#### With NPM

```shell
npm run develop
```

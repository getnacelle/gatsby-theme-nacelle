<p align="center">
  <a href="https://www.getnacelle.com">
    <img alt="Gatsby" src="https://www.gatsbyjs.org/monogram.svg" width="60" />
    <img alt="Nacelle" src="https://raw.githubusercontent.com/getnacelle/gatsby-theme-nacelle/master/examples/store-with-checkout/src/images/nacelle-rocket-icon-crop.png" width="60" />
  </a>
</p>

[![Netlify Status](https://api.netlify.com/api/v1/badges/eea79857-e8bd-4832-87a4-ca398782251f/deploy-status)](https://app.netlify.com/sites/affectionate-sinoussi-2c533e/deploys)

# Demo Site for Gatsby-Theme-Nacelle

A very basic, totally unstyled Gatsby site running `gatsby-theme-nacelle`. This site demonstrates the use of `gatsby-node.js` to programatically build pages for products and collections.

**NOTE**: Cart and checkout functionality is available in the `store-with-checkout` example/

## What is Nacelle?

Nacelle is a headless eCommerce platform made for developers who want to create superior customer buying experiences. When you connect your Shopify, Magento, or custom eCommerce store to Nacelle, our proprietary indexing system supplies a high-performance connection to your back end.

To learn more, check out our [docs](https://docs.getnacelle.com/intro.html#what-is-nacelle).

## Quick Start

To run this locally, you'll need to first [create a Nacelle account](https://dashboard.getnacelle.com/) and follow the [directions](https://docs.getnacelle.com/getting-started.html#configure-your-shopify-account) for connecting a Shopify store. Once your store is connected, copy the `Space ID` and `Token` values from your Space Settings in the [Nacelle Dashboard]((https://dashboard.getnacelle.com/).

Next, we'll use these as environment variables. Create a `.env` file in the root of the `store-with-checkout` project with the following values:

```dotenv
NACELLE_GRAPHQL_TOKEN="your-token-goes-here"
NACELLE_SPACE_ID="your-space-id-goes-here"
```

You're ready to go! Get started with Yarn or NPM:

#### With Yarn

```shell
yarn develop
```

#### With NPM

```shell
npm run develop
```
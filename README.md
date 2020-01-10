<p align="center">
  <a href="https://www.getnacelle.com">
    <img alt="Gatsby" src="https://www.gatsbyjs.org/monogram.svg" width="60" />
    <img alt="Nacelle" src="./example/src/images/nacelle-rocket-icon-crop.png" width="60" />
  </a>
</p>
<h1 align="center">
  Gatsby-Theme-Nacelle Workspace
</h1>

[![Netlify Status](https://api.netlify.com/api/v1/badges/eea79857-e8bd-4832-87a4-ca398782251f/deploy-status)](https://app.netlify.com/sites/affectionate-sinoussi-2c533e/deploys)

This project was scaffolded with [gatsby-starter-theme-workspace](https://github.com/gatsbyjs/gatsby-starter-theme-workspace). Using this starter makes it easy to develop a theme and see it in action on an example site. Once you've set up the requisite environment variables, you can fire up the `example` site, connected to `gatsby-theme-nacelle`, by running the `develop` script from the workspace root:

```shell
npm run develop
```

## What is Nacelle?

Nacelle is a headless eCommerce platform made for developers who want to create superior customer buying experiences. When you connect your Shopify, Magento, or custom eCommerce store to Nacelle, our proprietary indexing system supplies a high-performance connection to your back end.

To learn more, check out the [Nacelle docs](https://docs.getnacelle.com/intro.html#what-is-nacelle).

## What's Inside

### `gatsby-theme-nacelle`

This Gatsby theme effectively functions as a plugin to connect to a [Nacelle](https://www.getnacelle.com) store via the Nacelle Hail Frequency API. This connection allows you to get all of a store's product data (individual products, collections, etc.) and content data (blog posts, articles, etc.).

Learn more in the [docs](./gatsby-theme-nacelle/README.md).

### `example`

A very basic, totally unstyled Gatsby site running `gatsby-theme-nacelle`. This site demonstrates the use of `gatsby-node.js` to programatically build pages for products and collections.

**NOTE**: Cart and checkout functionality will be available in future versions of this demo site.

Learn more in the [docs](./example/README.md).

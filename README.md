<p align="center">
  <a href="https://www.getnacelle.com">
    <img alt="Gatsby" src="https://www.gatsbyjs.org/monogram.svg" width="60" />
    <img alt="Nacelle" src="https://raw.githubusercontent.com/getnacelle/gatsby-theme-nacelle/master/example/src/images/nacelle-rocket-icon-crop.png" width="60" />
  </a>
</p>
<h1 align="center">
  Gatsby-Theme-Nacelle Workspace
</h1>

[![Netlify Status](https://api.netlify.com/api/v1/badges/eea79857-e8bd-4832-87a4-ca398782251f/deploy-status)](https://app.netlify.com/sites/affectionate-sinoussi-2c533e/deploys)

This project was scaffolded with [gatsby-starter-theme-workspace](https://github.com/gatsbyjs/gatsby-starter-theme-workspace). Using this starter makes it easy to develop a theme and see it in action on an example site. Once you've set up the requisite environment variables, you can fire up the `example` site, connected to `gatsby-theme-nacelle`, by running the `develop` script from the workspace root:

#### With Yarn

```shell
yarn develop
```

#### With NPM

```shell
npm run develop
```

## What is Nacelle?

Nacelle is a headless eCommerce platform made for developers who want to create superior customer buying experiences. When you connect your Shopify, Magento, or custom eCommerce store to Nacelle, our proprietary indexing system supplies a high-performance connection to your back end.

To learn more, check out the [Nacelle docs](https://docs.getnacelle.com/intro.html#what-is-nacelle).

## What's Inside

### `gatsby-theme-nacelle`

This Gatsby theme effectively functions as a plugin to connect to a [Nacelle](https://www.getnacelle.com) store via the Nacelle Hail Frequency API. This connection allows you to get all of a store's product data (individual products, collections, etc.) and content data (blog posts, articles, etc.).

Learn more in the theme's [README](./gatsby-theme-nacelle/README.md).

### `examples`

Very basic, spartanly-styled Gatsby sites running `gatsby-theme-nacelle`. These sites demonstrate the use of `gatsby-theme-nacelle` with varying features & levels of complexity. 

The most basic example (`product-gallery`) demonstrates the use of `gatsby-node.js` to programatically build pages for products and collections. 

The `store-with-checkout` example builds on that idea, adding a cart system connected to Redux with a checkout feature powered by Nacelle's Hail Frequency API. 

Check out the example site [here](https://affectionate-sinoussi-2c533e.netlify.com/), and learn more about the examples from their respective READMEs.

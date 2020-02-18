import axios from 'axios';
import Multipassify from 'multipassify';

export const accountClient = axios.create({
  baseURL: `https://${process.env.GATSBY_MYSHOPIFY_DOMAIN}/api/2020-01/graphql`,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Shopify-Storefront-Access-Token':
      process.env.GATSBY_SHOPIFY_GRAPHQL_TOKEN
  }
});

export const multipassify = new Multipassify(
  process.env.GATSBY_SHOPIFY_MULTIPASS_SECRET
);

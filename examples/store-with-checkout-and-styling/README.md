# Nacelle Gatsby Store with Checkout and Styling

[![Netlify Status](https://api.netlify.com/api/v1/badges/2f0ce430-b668-4871-9d87-8725e0d3fb79/deploy-status)](https://app.netlify.com/sites/condescending-kilby-779b67/deploys)

[Demo Site](https://app.netlify.com/sites/condescending-kilby-779b67/account)

This example site demonstrates the use of [Shopify Multipass](https://shopify.dev/docs/admin-api/rest/reference/plus/multipass) for creating and interacting with customer accounts belonging to a Shopify store, from a Nacelle-powered storefront. 

Shopify's Storefront API is used to interact with these customer accounts after they are created.

This site also [demonstrates the use of the Facebook SDK](./src/components/FacebookLogin.js) to obtain user information 
for registration / login with Multipass.

Other Features:
- Persistent cart w/Redux & local storage
- Checkout with Nacelle's Hail Frequency API
- Pages (Landing Page, Collections, PDPs, Blog Posts, etc.) programatically built using data from the Hail Frequency API
- Offline support (it's a PWA)

### Required Environment Variables

```
# .env

NACELLE_SPACE_ID
NACELLE_GRAPHQL_TOKEN
GATSBY_NACELLE_SPACE_ID
GATSBY_NACELLE_GRAPHQL_TOKEN
GATSBY_MYSHOPIFY_DOMAIN
GATSBY_SHOPIFY_CUSTOM_DOMAIN
GATSBY_SHOPIFY_MULTIPASS_SECRET
GATSBY_SHOPIFY_GRAPHQL_TOKEN
GATSBY_FACEBOOK_APP_ID
GATSBY_CLOUDINARY_CLOUD_NAME
```

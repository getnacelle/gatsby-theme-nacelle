require('dotenv').config()

module.exports = {
  plugins: [
    {
      resolve: `@nacelle/gatsby-theme-nacelle`, 
      options: {
        nacelle_space_id: process.env.NACELLE_SPACE_ID,
        nacelle_graphql_token: process.env.NACELLE_GRAPHQL_TOKEN
      } 
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-theme-nacelle-demo`,
        short_name: `nacelle`,
        start_url: `/`,
        background_color: `#2846dc`,
        theme_color: `#2846dc`,
        display: `minimal-ui`,
        icon: `src/images/nacelle-rocket-icon.png`,
      },
    },
  ],
}

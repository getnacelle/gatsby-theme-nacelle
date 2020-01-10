require('dotenv').config()

module.exports = {
  plugins: [
    {
      resolve: `gatsby-theme-nacelle`, 
      options: {} 
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
        icon: `src/images/nacelle-rocket-icon.png`, // This path is relative to the root of the site.
      },
    },
  ],
}

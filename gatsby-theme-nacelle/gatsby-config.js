module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'Nacelle',
        fieldName: 'nacelle',
        url: `https://hailfrequency.com/graphql/v1/space/${process.env.NACELLE_SPACE_ID}`,
        headers: {
          'X-Nacelle-Token': process.env.NACELLE_GRAPHQL_TOKEN
        },
      },
    },
  ]
}

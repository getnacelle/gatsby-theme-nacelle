module.exports = options => {
  // Be forgiving about the ways users might try to define the options
  const nacelle_space_id = options.nacelle_space_id || options['nacelle-space-id'] || options.nacelleSpaceID || options.nacelleSpaceId
  const nacelle_graphql_token = options.nacelle_graphql_token || options['nacelle-graphql-token']|| options.nacelleGraphQLToken || options.nacelleGraphqlToken
  if (nacelle_space_id === undefined) {
    throw new Error('gatsby-theme-nacelle: nacelle_space_id is undefined.')
  }
  if (nacelle_graphql_token === undefined) {
    throw new Error('gatsby-theme-nacelle: nacelle_graphql_token is undefined.')
  }
  return {
    plugins: [
      {
        resolve: 'gatsby-source-graphql',
        options: {
          typeName: 'Nacelle',
          fieldName: 'nacelle',
          url: `https://hailfrequency.com/graphql/v1/space/${nacelle_space_id}`,
          headers: {
            'X-Nacelle-Token': nacelle_graphql_token
          },
        },
      },
    ]
  }
}


const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const schema = require('../../graphql');

module.exports = {
  // The GraphQL endpoint
  main: graphqlExpress({ schema }),

  // GraphiQL, a visual editor for queries
  test: graphiqlExpress({ endpointURL: '/graphql' }),
};

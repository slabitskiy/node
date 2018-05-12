const { makeExecutableSchema } = require('graphql-tools');

const typeDefs = `
    type Query {
        req2: String!
    }
`;

const resolvers = {
  Query: {
    req2: () => 'req2',
  },
};


module.exports = makeExecutableSchema({ typeDefs, resolvers });

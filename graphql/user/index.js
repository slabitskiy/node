const { makeExecutableSchema } = require('graphql-tools');
const { User } = require('../../modules');
const { user } = require('./types');

const typeDefs = `
    ${user}

    input CreateUserInp {
        password: String!
        name: String!
        email: String!
    }

    input UpdateUserInp {
        name: String,
        email: String,
        password: String
    }

    type Query {
        users: [User]
        user(id: String!): User
    }

    type Mutation {
        createUser (user: CreateUserInp!): User
        updateUser (id: String!, user: UpdateUserInp!): User
        deleteUser (id: String!): User
    }

`;

const resolvers = {
  Query: {
    users: async () => {
      const users = await User.list();

      return users;
    },
    user: async (_, { id }) => {
      const user = await User.getById(id);
      return user;
    },
  },
  Mutation: {
    createUser: async (_, { user: userEntity }) => {
      const user = await User.create(userEntity);

      return user;
    },
    updateUser: async (_, { id, user: userEntity }) => {
      const user = await User.updateById(id, userEntity);

      return user;
    },
    deleteUser: async (_, { id }) => {
      const user = await User.deleteById(id);

      return user;
    },
  },
};

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
});


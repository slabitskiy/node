const { User } = require('../../modules');

module.exports = {
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


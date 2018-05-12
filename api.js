const {
  userRoute, boardRoute, listRoute, taskRoute, authRoute, graphQlRoute,
} = require('./routes');

const { ensureAuth } = require('./middelwares');

module.exports = (app) => {
  app.use('/graphql', graphQlRoute.main);
  app.use('/graphiql', graphQlRoute.test);
  app.use('/auth', authRoute);
  app.use(ensureAuth);
  app.use('/user', userRoute);
  app.use('/board', boardRoute);
  app.use('/list', listRoute);
  app.use('/task', taskRoute);
};

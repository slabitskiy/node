
const path = require('path');
const { fileLoader, mergeTypes, mergeResolvers } = require('merge-graphql-schemas');
const { makeExecutableSchema } = require('graphql-tools');

const typesArray = fileLoader(path.join(__dirname, './**/*.graphql'));
const resolversArray = fileLoader(path.join(__dirname, './**/resolvers.js'));

const typeDefs = mergeTypes(typesArray, { all: true });
const resolvers = mergeResolvers(resolversArray);


module.exports = makeExecutableSchema({ typeDefs, resolvers });


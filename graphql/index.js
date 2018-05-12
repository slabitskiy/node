
const { mergeSchemas } = require('graphql-tools');

const user = require('./user');
const task = require('./task');

const schemas = [user, task];


module.exports = mergeSchemas({ schemas });


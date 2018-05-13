
const { mergeSchemas } = require('graphql-tools');

const user = require('./user');
const task = require('./task');
const list = require('./list');

const schemas = [user, task, list];


module.exports = mergeSchemas({ schemas });


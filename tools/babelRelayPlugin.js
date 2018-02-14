const getBabelRelayPlugin = require('babel-relay-plugin');
const schemaData = require('../src/schema.graphql');
module.exports = getBabelRelayPlugin(schemaData.data);
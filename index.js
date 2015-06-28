'use strict';

module.exports = {
  utils: {
    parseLink: require('./lib/utils/parseLink'),
    getFacebookStats: require('./lib/utils/getFacebookStats')
  },

  API: require('./lib/api'),

  xmlrpc: require('./lib/xmlrpc'),

  jsonrpc: require('./lib/jsonrpc')
};

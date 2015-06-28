'use strict';

var request = require('superagent');

function _groupBy(arr, amount) {
  var result = [], offset = 0;

  do {
    result.push(arr.slice(offset, offset + amount));
    offset += amount;
  } while (offset < arr.length);

  return result;
}

function getFacebookStats(urls, callback) {
  var groups = _groupBy(urls, 10),
      result = {},
      done = 0;

  groups.forEach(function(group) {
    request('http://graph.facebook.com/').query({
      ids: group.join(',')
    }).end(function(err, res) {
      if (!err && res.statusCode == 200) {
        var body = JSON.parse(res.text);

        for (var key in body) {
          result[key] = body[key].shares || 0;
        }

        done++;
        if (done >= groups.length) {
          callback(null, result);
        }
      } else {
        callback(err);
      }
    });
  });
}

module.exports = getFacebookStats;

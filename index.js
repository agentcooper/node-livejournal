var request = require('request');

var RPC = require('./rpc');

var API = require('./api');

var rxLink = [
  /([0-9a-zA-Z-_]+)\.livejournal\.com\/([0-9]+)\.html/,
  /m\.livejournal\.com\/read\/[a-z]+\/([0-9a-zA-Z_-]+)\/(\d+)/,
  /users\.livejournal\.com\/([0-9a-zA-Z-_]+)\/([0-9]+).html/
];

function _groupBy(arr, amount) {
  var result = [], offset = 0;

  do {
    result.push(arr.slice(offset, offset + amount));
    offset += amount;
  } while (offset < arr.length);

  return result;
}

function getFBStats(urls, callback) {
  var groups = _groupBy(urls, 10),
      result = {},
      done = 0;

  groups.forEach(function(group) {

    request({
      url: 'http://graph.facebook.com/?ids=' + group.join(','),
      json: true
    }, function(err, res, body) {
      if (!err && res.statusCode == 200) {
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

function parseLink(url) {
  if (!url) {
    return null;
  }

  for (var i = 0, match; i < rxLink.length; i++) {
    match = url.match(rxLink[i]);

    if (match && match.length === 3) {
      return { journal: match[1], postId: match[2] };
    }
  }

  return null;
}

module.exports = {
  getFBStats: getFBStats,
  parseLink: parseLink,

  RPC: RPC,

  API: API
};

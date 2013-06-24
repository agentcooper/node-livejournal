var RPC = require('./rpc');

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

module.exports = {
  getFBStats: getFBStats,

  RPC: RPC
};

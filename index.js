var request = require('request'),
    cheerio = require('cheerio'),

    xml2js  = require('xml2js'),
    parser  = new xml2js.Parser();

var j = request.jar(),
    cookie = request.cookie('adult_explicit=1');

j.add(cookie);


function getComments(post, callback) {
  request({
    url: 'http://{username}.livejournal.com/{username}/__rpc_get_thread'.replace(/\{username\}/g, post.user),
    qs: {
      journal: post.user,
      itemid: post.post_id,
      page: 1
    },
    json: true
  }, function(err, res, body) {
    callback(err, body);
  });
}


// @TODO: tags
function getPost(post, callback) {
  request({
    url: 'http://m.livejournal.com/read/user/' + post.user + '/' + post.post_id,
    jar: j
  }, function(err, res, body) {
    if (!err && res.statusCode == 200) {
      var $ = cheerio.load(body),
          title = $('.item-header').text().trim(),
          time  = new Date( $('.item-meta').text().trim() ),
          commentNode = $('.to-all-alone'),
          comments,
          errorNode = $('.error');

      if (errorNode.length > 0) {
        callback(new Error(errorNode.text()), null);
        return;
      }

      if (commentNode.length > 0) {
        comments = $('.to-all-alone').text().trim().match(/\d+/)[0];
      } else {
        comments = 0;
      }

      var result = {
        title: title,
        time: time,
        comments: comments
      };

      if (post.body) {
        result.body = $('.item-text').html();
      }

      if (!title) {
        console.log('err:', err, 'body:', body);
      }

      callback(err, result);
    } else {
      callback(err, null);
    }
  });
}

function getFBStats(user, postId, callback) {
  request({
    url: 'http://graph.facebook.com/?id=http://' + user + '.livejournal.com/' + postId + '.html',
    json: true
  }, function(err, res, body) {
    if (!err && res.statusCode == 200) {
      callback(err, {shares: body.shares || 0 });
    } else {
      console.log(err, body);
    }
  });
}

function _groupBy(arr, amount) {
  var result = [], offset = 0;

  do {
    result.push(arr.slice(offset, offset + amount));
    offset += amount;
  } while (offset < arr.length);

  return result;
}

function getFBStatsBatch(urls, callback) {
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

function getJournal(user, callback) {
  request({
    url: 'http://' + user + '.livejournal.com/data/atom'
  }, function(err, res, body) {
    if (err) {
      callback(err, null);
      return;
    }

    parser.parseString(body, function (err, result) {
      callback(err, result);
    });
  });
}

module.exports = {
  getPost: getPost,
  getFBStats: getFBStats,
  getFBStatsBatch: getFBStatsBatch,

  getComments: getComments,

  getJournal: getJournal
};

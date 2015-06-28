'use strict';

var request = require('superagent');

var BASE = 'http://www.livejournal.com/';

function getFriends(params, callback) {
    request.get(BASE + '/misc/fdata.bml').query({
      user: params.journal
    }).end(function(err, res) {
        if (err) {
            return callback(err, null);
        }

        var body = res.text;

        if (body.charAt(0) === '!') {
            return callback({ message: body.trim() }, null);
        }

        var lines = body.split('\n');

        // remove the comment
        lines.shift();

        var output = lines.filter(Boolean).reduce(function(res, line) {
            var journal  = line.trim().slice(2),
                isFriend = line.charAt(0) === '>';

            if (journal) {
                (isFriend ? res.friends : res.friendOf).push(journal);
            }

            return res;
        }, {
            friends: [], friendOf: []
        });

        callback(null, output);
    });
}

module.exports = {
    getFriends: getFriends
};

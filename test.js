var LiveJournal = require('./');

LiveJournal.jsonRPC.request('comment.get_thread', {
    journal: 'tema',
    itemid: '1987717'
}, function(err, res) {
    console.log(res.body.result.comments.length);
});

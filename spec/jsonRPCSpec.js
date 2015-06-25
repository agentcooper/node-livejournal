var LiveJournal = require('../');

describe('LiveJournal.jsonRPC', function() {
    describe('LiveJournal.jsonRPC.request', function() {

        it('latest.get_entries', function(done) {
            LiveJournal.jsonRPC.request('latest.get_entries', {
                first_timepost: 1435262400
            }, function(err, res) {
                expect(res.body.result.params.recent).toBeDefined();
                done();
            });
        }, 10000);

        it('comment.get_thread', function(done) {
            LiveJournal.jsonRPC.request('comment.get_thread', {
                journal: 'tema',
                itemid: '1987717'
            }, function(err, res) {
                expect(res.body.result.comments).toBeDefined();
                done();
            });
        }, 10000);
    });
});

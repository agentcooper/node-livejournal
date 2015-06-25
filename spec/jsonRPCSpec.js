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

    });
});

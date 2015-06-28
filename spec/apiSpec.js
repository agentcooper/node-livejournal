var LiveJournal = require('../');

describe('LiveJournal.API', function() {
  describe('getFriends', function() {
    it('should provide friends and friendOf', function(done) {
        LiveJournal.API.getFriends({
          journal: 'ljreader-app'
        }, function(err, res) {
            expect(res.friends).toBeDefined();
            expect(res.friendOf).toBeDefined();

            expect(res.friends.length > 0).toBe(true);
            expect(res.friendOf.length > 0).toBe(true);
            done();
        });
    }, 10000);
  });
});

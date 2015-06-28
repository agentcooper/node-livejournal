var LiveJournal = require('../../');

describe('LiveJournal.utils', function() {
  describe('getFacebookStats', function() {
    it('should get share stats', function(done) {
      var urls = [
        'http://brad.livejournal.com/2409049.html',
        'http://brad.livejournal.com/2410009.html',
        'http://brad.livejournal.com/29215.html',
        'http://brad.livejournal.com/badlink'
      ];

      LiveJournal.utils.getFacebookStats(urls, function(err, res) {
        urls.forEach(function(url) {
          expect(res[url]).toBeDefined();
          expect(typeof res[url] === 'number').toBe(true);
        });
        done();
      });
    }, 10000);
  });
});

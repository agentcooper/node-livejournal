var LiveJournal = require('../../');

describe('LiveJournal.utils', function() {

  describe('LiveJournal.utils.parseLink', function() {

    it('should parse full post links', function() {
      expect(
        LiveJournal.utils.parseLink('http://drugoi.livejournal.com/3878736.html')
      ).toEqual({
        journal: 'drugoi',
        postId: '3878736'
      });
    });

    it('should parse mobile links', function() {
      expect(
        LiveJournal.utils.parseLink('http://m.livejournal.com/read/user/endryx/764669')
      ).toEqual({
        journal: 'endryx',
        postId: '764669'
      });
    });

    it('should parse posts from users with underscores', function() {
      expect(
        LiveJournal.utils.parseLink('http://users.livejournal.com/_pancho_/54196.html')
      ).toEqual({
        journal: '_pancho_',
        postId: '54196'
      });
    });

    it('should fail for non posts links', function() {
      expect(
        LiveJournal.utils.parseLink('http://livejournal.com/update.bml')
      ).toEqual(null);

      expect(
        LiveJournal.utils.parseLink('http://tema.livejournal.com')
      ).toEqual(null);

      expect(
        LiveJournal.utils.parseLink('http://livejournal.com')
      ).toEqual(null);

      expect(
        LiveJournal.utils.parseLink(null)
      ).toEqual(null);
    });

  });

});

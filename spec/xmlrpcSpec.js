var LiveJournal = require('../');

describe('LiveJournal.xmlrpc', function() {
  describe('LiveJournal.xmlrpc.get_entries', function() {

    it('should return posts', function(done) {
      LiveJournal.xmlrpc.getevents({
        journal: 'brad',
        auth_method: 'noauth',
        selecttype: 'lastn',
        howmany: 20
      }, function(err, value) {
        expect(value.events).toBeDefined();
        done();
      });
    }, 10000);

    it('should return post', function(done) {
      LiveJournal.xmlrpc.getevents({
        journal: 'brad',
        auth_method: 'noauth',
        selecttype: 'one',
        ditemid: '29215'
      }, function(err, post) {
        expect(post.events[0]).toBeDefined();
        done();
      });
    }, 10000);

  });
});

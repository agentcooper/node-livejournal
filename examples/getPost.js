var LiveJournal = require('../');

LiveJournal.RPC.getevents({
  journal: 'brad',
  auth_method: 'noauth',
  selecttype: 'one',
  ditemid: '29215'
}, function(err, post) {
  console.log(post.events[0]);
});

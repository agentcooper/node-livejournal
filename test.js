var LiveJournal = require('./');

LiveJournal.xmlrpc.getevents({
  journal: 'brad',
  auth_method: 'noauth',
  selecttype: 'lastn',
  howmany: 20
}, function(err, value) {
  console.log(value.events);
});

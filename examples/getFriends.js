var LiveJournal = require('../');

LiveJournal.API.getFriends({
  journal: 'agentcooper'
}, function(err, res) {
  console.log(res);
});

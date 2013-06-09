var livejournal = require('./');

// get journal entries
// check http://www.livejournal.com/bots/
livejournal.getJournal('brad', function(err, journal) {

  var links = journal.entry.map(function(entry) {
    return entry.link[0]['@'].href;
  });

  // get facebook share count for latest posts
  livejournal.getFBStatsBatch(links, function(err, stats) {
    console.log(stats);
  });
});

// get post details by username and id
livejournal.getPost({
  user: 'brad',
  post_id: 29215,
  body: true
}, function(err, post) {
  console.log(post);
});

// get comments (shitty html, sorry)
livejournal.getComments({
  user: 'brad',
  post_id: 29215
}, function(err, comments) {
  console.log(comments);
});

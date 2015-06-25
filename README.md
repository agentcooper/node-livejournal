## LiveJournal API

[![Build Status](https://travis-ci.org/agentcooper/node-livejournal.svg?branch=master)](https://travis-ci.org/agentcooper/node-livejournal)

`npm install livejournal`

This package provides access to both XMLRPC and JSONRPC APIs for LiveJournal.

## XMLRPC

* http://wh.lj.ru/s2/developers/f/LiveJournal_XML-RPC_Specification_(EN).pdf
* http://www.livejournal.com/doc/server/ljp.csp.xml-rpc.protocol.html

Examples

```javascript
// get posts inside the journal using XMLRPC
LiveJournal.xmlrpc.getevents({
  journal: 'brad',
  auth_method: 'noauth',
  selecttype: 'lastn',
  howmany: 20
}, function(err, value) {
  console.log(value.events);
});
```

```javascript
// get post content using XMLRPC
LiveJournal.xmlrpc.getevents({
  journal: 'brad',
  auth_method: 'noauth',
  selecttype: 'one',
  ditemid: '29215'
}, function(err, post) {
  console.log(post.events[0]);
});
```

## JSONRPC

There is no official public description of LiveJournal JSON RPC methods, but you can check `Site.rpc.public` on `http://livejournal.com`. Because the data is stored on CDN, you can access the data from anywhere.

Those are current ones (badly documented, contributions are welcome):

##### `discovery.author_posts`
##### `comment.get_thread`
Get comments thread
```
Params:
journal -- Journal username
itemid -- Post id
```
##### `latest.get_entries`
Get latest posts
```
Params:
first_timepost
```
##### `browse.get_posts`
##### `gifts.get_gifts_categories`
##### `gifts.get_all_gifts`
##### `homepage.get_categories`
##### `discovery.suggest`
##### `sitemessage.get_message`
##### `discovery.get_categories`
##### `browse.get_categories`
##### `writers_block.get_list`
##### `discovery.today`
##### `discovery.get_feed`
##### `discovery.get_item`
##### `homepage.get_rating`
##### `browse.get_communities`


Examples

```js
// get latest posts using JSONRPC
LiveJournal.jsonrpc.request('latest.get_entries', {
  first_timepost: 1435262400
}, function(err, res) {
  console.log(res.body.result.params.recent);
});
```

```js
// get comments using JSONRPC
LiveJournal.jsonrpc.request('comment.get_thread', {
  journal: 'tema',
  itemid: '1987717'
}, function(err, res) {
  console.log(res.body.result.comments)
});
```

You can access method list using `LiveJournal.jsonrpc.methods`.

## Other docs and resources

* http://www.livejournal.com/developer/
* http://lj-dev.livejournal.com/

## Tests

```
npm install jasmine -g
npm test
```

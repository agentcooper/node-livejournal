## LiveJournal XMLRPC for Node

`npm install livejournal`

### Docs

## XMLRPC

* http://wh.lj.ru/s2/developers/f/LiveJournal_XML-RPC_Specification_(EN).pdf
* http://www.livejournal.com/doc/server/ljp.csp.xml-rpc.protocol.html

## Other

* http://www.livejournal.com/developer/
* http://lj-dev.livejournal.com/

### Example

```javascript
LiveJournal.RPC.getevents({
  journal: 'brad',
  auth_method: 'noauth',
  selecttype: 'lastn',
  howmany: 20
}, function(err, value) {
  console.log(value.events);
});
```

```javascript
LiveJournal.RPC.getevents({
  journal: 'brad',
  auth_method: 'noauth',
  selecttype: 'one',
  ditemid: '29215'
}, function(err, post) {
  console.log(post.events[0]);
});
```

## Tests

```
npm install jasmine-node -g
jasmine-node spec/
```

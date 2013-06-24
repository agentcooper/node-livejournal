/*
 * Docs
 *
 * http://wh.lj.ru/s2/developers/f/LiveJournal_XML-RPC_Specification_(EN).pdf
 * http://www.livejournal.com/doc/server/ljp.csp.xml-rpc.protocol.html
 */

var xmlrpc = require('xmlrpc');

LJ = xmlrpc.createClient({
  host: 'livejournal.com',
  path: '/interface/xmlrpc',
  port: 80
});

var methods = [
  'checkfriends',
  'consolecommand',
  'editevent',
  'editfriendgroups',
  'editfriends',
  'friendof',
  'getchallenge',
  'getdaycounts',
  'getevents',
  'getfriends',
  'getfriendgroups',
  'getusertags',
  'login',
  'postevent',
  'essionexpire',
  'sessiongenerate',
  'syncitems',
  'getfriendspage',
  'getcomments'
];

var RPC = {};

methods.forEach(function(method) {
  RPC[method] = function(params, callback) {

    params.ver = params.ver || 1;

    LJ.methodCall('LJ.XMLRPC.' + method, [params], function(err, value) {
      callback(err, value);
    });
  }
});

module.exports = RPC;

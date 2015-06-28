/*
 * Docs
 *
 * http://wh.lj.ru/s2/developers/f/LiveJournal_XML-RPC_Specification_(EN).pdf
 * http://www.livejournal.com/doc/server/ljp.csp.xml-rpc.protocol.html
 */

'use strict';

var xmlrpc = require('xmlrpc');

var LJ = xmlrpc.createClient({
  host: 'www.livejournal.com',
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
  'getcomments',
  'addcomment'
];

var RPC = {};

RPC.setAuth = function(auth) {
  LJ.options.headers['Authorization'] = auth;
};

methods.forEach(function(method) {
  RPC[method] = function(params, callback) {

    params.ver = params.ver || 1;

    LJ.methodCall('LJ.XMLRPC.' + method, [params], function(err, value) {
      callback(err, value);
    });
  };
});

module.exports = RPC;

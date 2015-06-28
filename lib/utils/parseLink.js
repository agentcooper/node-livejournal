'use strict';

var rxLink = [
  /([0-9a-zA-Z-_]+)\.livejournal\.com\/([0-9]+)\.html/,
  /m\.livejournal\.com\/read\/[a-z]+\/([0-9a-zA-Z_-]+)\/(\d+)/,
  /users\.livejournal\.com\/([0-9a-zA-Z-_]+)\/([0-9]+).html/
];

function parseLink(url) {
  if (!url) {
    return null;
  }

  for (var i = 0, match; i < rxLink.length; i++) {
    match = url.match(rxLink[i]);

    if (match && match.length === 3) {
      return { journal: match[1], postId: match[2] };
    }
  }

  return null;
}

module.exports = parseLink;

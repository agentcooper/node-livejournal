var request = require('superagent');

var url = 'http://l-api.livejournal.com/__api/';

module.exports = {
    request: function(method, params, callback) {
        var params = {
            jsonrpc: '2.0',
            method: method,
            params: params,
            id: String(Math.random()).slice(2)
        };

        request.get(url).query({
            request: JSON.stringify(params)
        }).end(callback);
    },

    // public methods and their rate limits
    // to get fresh data, invoke 'Site.public.rpc' on livejournal.com
    methods: {
        'discovery.author_posts': 300,
        'comment.get_thread': 900,
        'latest.get_entries': 180,
        'browse.get_posts': 300,
        'gifts.get_gifts_categories': 60,
        'gifts.get_all_gifts': 60,
        'homepage.get_categories': 60,
        'discovery.suggest': 300,
        'sitemessage.get_message': 3600,
        'discovery.get_categories': 300,
        'browse.get_categories': 300,
        'writers_block.get_list': 60,
        'discovery.today': 300,
        'discovery.get_feed': 300,
        'discovery.get_item': 300,
        'homepage.get_rating': 300,
        'browse.get_communities': 300
    }
};

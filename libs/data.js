// extends from basic api instance
var cb = require('./callback');

exports = module.exports = function(data, wifi) {
    
    var self = data,
        key = wifi.key;

    // shorthand of fetch
    data.fetch = function(params, callback) {
        var query = { body:{}};
        if (typeof(params) === 'string') query.key = params;
        if (typeof(params) === 'object') query.body = params;
        query.body.appkey = key;
        self.get(query, cb(callback));
    };

    // shorthand of create
    data.create = function(params, callback) {
        var body = params;
        body.appkey = key;
        self.post({
            body: body
        }, cb(callback));
    };

};
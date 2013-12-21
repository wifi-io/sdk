// extends from basic api instance
var cb = require('./callback');

exports = module.exports = function(device, wifi) {
    
    var self = device,
        key = wifi.key;

    // shorthand of list
    device.list = function(params, callback) {
        var body = params;
        body.appkey = key;
        self.get({
            query: body
        }, cb(callback));
    };

    // shorthand of fetch
    device.fetch = function(did, callback) {
        var body = {};
        body.appkey = key;
        self.get({
            did: did,
            query: body
        }, cb(callback));
    };

    // shorthand of bind
    device.bind = function(did, params, callback) {
        var body = params;
        body.appkey = key;
        self.post({
            did: did,
            body: body
        }, cb(callback));
    };

    // shorthand of notify
    device.notify = function(did, params, callback) {
        var body = params;
        body.appkey = key;
        self.exec({
            action: 'notify',
            did: did,
            body: body
        }, cb(callback));
    };

    // shorthand of command
    device.command = function(did, params, callback) {
        var body = params;
        body.appkey = key;
        self.exec({
            action: 'command',
            did: did,
            body: body
        }, cb(callback));
    };

    // shorthand of unbind
    device.unbind = function(did, callback) {
        var body = {};
        body.appkey = key;
        self.exec({
            action: 'unbind',
            did: did,
            body: body
        }, cb(callback));
    };

};
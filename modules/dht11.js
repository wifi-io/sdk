module.exports = function(params, callback) {
    var self = this,
        cb = (!callback && typeof(params) == 'function') ? params : callback,
        params = (typeof(params) == 'object') ? params : {};
    self.device.exec({
        body: {
            token: self.token ? self.token : params.token,
            did: self.did ? self.did : params.did,
            method: 'dht11.read',
            params: {}
        }
    }, cb);
}
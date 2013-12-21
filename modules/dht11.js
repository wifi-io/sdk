module.exports = function(params, callback) {
    if (!this.did) return callback(new Error('deviceID required'));
    var cb = (!callback && typeof(params) == 'function') ? params : callback,
        params = (typeof(params) == 'object') ? params : {};
    params.method = 'dht11.read';
    this.device.command(this.did, params, cb);
}
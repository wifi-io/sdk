var defaults = {
    OutPP: [1, 2],
    Toggle: [1, 2]
};

module.exports = function(params, callback) {
    if (!this.did) return callback(new Error('deviceID required'));
    params.method = 'wifiIO.io_op';
    params.params = params.params ? params.params : defaults;
    this.device.command(this.did, params, callback);
}
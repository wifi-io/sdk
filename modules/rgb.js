var defaults = {
    r: 88,
    g: 12,
    b: 99
};

module.exports = function(params, callback) {
    if (!this.did) return callback(new Error('deviceID required'));
    params.method = 'rgb.pwm';
    params.params = params.params ? params.params : defaults;
    this.device.command(this.did, params, callback);
};
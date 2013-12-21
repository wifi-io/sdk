module.exports = function(params, callback) {
    if (!this.did) return callback(new Error('deviceID required'));
    params.method = 'camera.shot';
    this.device.command(this.did, params, callback);
};
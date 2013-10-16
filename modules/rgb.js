module.exports = function(params, callback) {
    var self = this;
    self.device.exec({
        body: {
            token: self.token ? self.token : params.token,
            did: self.did ? self.did : params.did,
            method: 'rgb.pwm',
            params: {
                r: params.r ? params.r : 88,
                g: params.g ? params.g : 12,
                b: params.b ? params.b : 99
            }
        }
    }, callback);
}
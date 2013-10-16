module.exports = function(params, callback) {
    var self = this;
    self.device.exec({
        body: {
            token: self.token ? self.token : params.token,
            did: self.did ? self.did : params.did,
            method: 'rgb.pwm',
            params: {
                r: params.r,
                g: params.g,
                b: params.b
            }
        }
    }, callback);
}
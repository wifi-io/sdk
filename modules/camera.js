module.exports = function(params, callback) {
    var self = this;
    self.device.exec({
        body: {
            token: self.token ? self.token : params.token,
            did: self.did ? self.did : params.did,
            method: 'camera.shot',
            params: {}
        }
    }, callback);
}
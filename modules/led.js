module.exports = function(params, callback) {
    var self = this;
    self.device.exec({
        body: {
            token: self.token ? self.token : params.token,
            did: self.did ? self.did : params.did,
            method: 'wifiIO.io_op',
            params: {
                OutPP:[1,2],
                Toggle:[1,2]
            }
        }
    }, callback);
}
//            _ _____    _     
//  _      __(_) __(_)  (_)___ 
// | | /| / / / /_/ /  / / __ \
// | |/ |/ / / __/ /_ / / /_/ /
// |__/|__/_/_/ /_/(_)_/\____/ 
//                                                     
// @brief: the sdk and package manager of wifi.io based on Node.js
// @author: [turingou](http://guoyu.me)

var sdk = require('sdk'),
    apis = require('./apis');

var Wifi = function(params) {
    this.account = params;
    this.server = 'http://api.wifi.io';
    Wifi.prototype.user = new sdk(apis.user, this);
    Wifi.prototype.device = new sdk(apis.device, this);
    Wifi.prototype.data = new sdk(apis.data, this);
};

// shotcut method to fetch token
Wifi.prototype.token = function(callback) {
    var self = this;
    self.user.signin({
        body: self.account
    },function(err, result){
        if (result.body && result.body.token && result.body.token != '') self.token = result.body.token;
        callback(err, result.body);
    })
}

module.exports = Wifi;
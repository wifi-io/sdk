//            _ _____    _     
//  _      __(_) __(_)  (_)___ 
// | | /| / / / /_/ /  / / __ \
// | |/ |/ / / __/ /_ / / /_/ /
// |__/|__/_/_/ /_/(_)_/\____/ 
//                                                     
// @brief: wifi.io node.js sdk
// @author: [turingou](http://guoyu.me)

var API = require('./lib/api');

var Wifi = function(params) {
    if (params) this.account = params;
    this.server = 'http://api.wifi.io/';
    Wifi.prototype.user = new API('user',this);
    Wifi.prototype.device = new API('device',this);
    Wifi.prototype.data = new API('data',this);
};

module.exports = Wifi;
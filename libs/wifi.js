var sdk = require('sdk'),
    apis = require('./apis'),
    device = require('./device'),
    data = require('./data');

var Wifi = function(key) {
    this.key = key;
    this.server = 'http://api.wifi.io';
    Wifi.prototype.device = device(new sdk(apis.device, this), this);
    Wifi.prototype.data = data(new sdk(apis.data, this), this);
};

// shorthand to store device id
Wifi.prototype.connect = function(id) {
    if (id && !isNaN(parseInt(did))) this.did = id;
    return this;
};

// load modules
Wifi.prototype.led = require('../modules/led');
Wifi.prototype.dht11 = require('../modules/dht11');
Wifi.prototype.rgb = require('../modules/rgb');
Wifi.prototype.camera = require('../modules/camera');

exports = module.exports = Wifi;
var api = require('beer');

var API = function(type, params) {
    if (params) this.parent = params;
    this.type = type;
}

var routerMap = function(type, params) {
    var map = {
        user: {
            login: 'user/login.php',
            logout: 'user/logout.php',
            devices: 'user/get_devices.php'
        },
        device: {
            command: 'device/command.php'
        },
        data: {
            get: 'data/get_data.php',
            getByKey: 'data/get_by_key.php',
            insert: 'data/insert.php'
        }
    }
    return map[type][params.action];
}

API.prototype.login = function(cb) {
    var info = this.parent,
        self = this;
    api.post(info.server + routerMap(self.type, {
        action: 'login'
    }), {
        username: info.account.username,
        password: info.account.password
    }, function(err, result) {
        if (!err && result.body.error == 0 && result.body.token != '') {
            info.token = result.body.token;
        }
        cb(err, result.body);
    });
}

API.prototype.logout = function(cb) {
    var info = this.parent,
        self = this;
    api.post(info.server + routerMap(self.type, {
        action: 'logout'
    }), {
        token: info.token ? info.token : ''
    }, function(err, result) {
        cb(err, result.body);
    });
}

API.prototype.devices = function(params, cb) {
    var info = this.parent,
        self = this,
        p = params;
    if (info.token) {
        p['token'] = info.token;
    }
    api.post(info.server + routerMap(self.type, {
        action: 'devices'
    }), p, function(err, result) {
        cb(err, result.body);
    });
}

API.prototype.command = function(params, cb) {
    var info = this.parent,
        self = this,
        p = params;
    if (info.token) {
        p['token'] = info.token;
    }
    api.post(info.server + routerMap(self.type,{
        action: 'command'
    }), p, function(err, result) {
        cb(err, result.body);
    });
}

API.prototype.get = function() {
    var info = this.parent,
        self = this,
        p = params;
    if (info.token) {
        p['token'] = info.token;
    }
    api.post(info.server + routerMap(self.type,{
        action: 'get'
    }), p, function(err, result) {
        cb(err, result.body);
    });
}

API.prototype.getByKey = function() {
    var info = this.parent,
        self = this,
        p = params;
    if (info.token) {
        p['token'] = info.token;
    }
    api.post(info.server + routerMap(self.type,{
        action: 'getByKey'
    }), p, function(err, result) {
        cb(err, result.body);
    });
}

API.prototype.insert = function() {
    var info = this.parent,
        self = this,
        p = params;
    if (info.token) {
        p['token'] = info.token;
    }
    api.post(info.server + routerMap(self.type,{
        action: 'insert'
    }), p, function(err, result) {
        cb(err, result.body);
    });
}

module.exports = API;